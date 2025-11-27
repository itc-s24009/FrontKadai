"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { MicroCMSImage } from "microcms-js-sdk";
import styles from "../About/page.module.css";

// --- 型定義 ---
export type FormattedHistoryContent = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  intro: string;
  paragraphs: string[];
  stats: { label: string; value: string }[];
  gallery: MicroCMSImage[];
};

type Props = {
  contentData: FormattedHistoryContent[];
};

// --- 個別のセクションコンポーネント (画像スライダー機能付き) ---
const HistorySection = ({
  data,
  index,
  setSectionRef,
}: {
  data: FormattedHistoryContent;
  index: number;
  setSectionRef: (el: HTMLElement | null) => void;
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isLayoutLeft = index % 2 === 0;

  // 画像切り替え関数
  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % data.gallery.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? data.gallery.length - 1 : prev - 1
    );
  };

  const currentImage = data.gallery[activeImageIndex];

  return (
    <section
      ref={setSectionRef}
      className={`${styles.section} ${
        isLayoutLeft ? styles.layoutLeft : styles.layoutRight
      }`}
    >
      <div className={styles.cableContainer}>
        <div className={styles.cableLine}></div>
        <div className={styles.connectionDot}></div>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.boxHeader}>
          <span className={styles.label}>{data.label}</span>
          <h2 className={styles.title}>{data.title}</h2>
          <div className={styles.headerSeparator}></div>
          <h3 className={styles.subtitle}>{data.subtitle}</h3>
        </div>

        <div className={styles.articleGrid}>
          <div className={styles.textColumn}>
            <p className={styles.intro}>{data.intro}</p>
            {data.paragraphs.map((txt, i) => (
              <p key={i} className={styles.paragraph}>
                {txt}
              </p>
            ))}
            <div className={styles.statsContainer}>
              {data.stats.map((st, i) => (
                <div key={i} className={styles.statItem}>
                  <span className={styles.statVal}>{st.value}</span>
                  <span className={styles.statKey}>{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.visualColumn}>
            <div className={styles.visualFrame}>
              {/* スライダーエリア：[左ボタン] [画像] [右ボタン] */}
              <div className={styles.sliderContainer}>
                {data.gallery.length > 1 && (
                  <button
                    onClick={handlePrev}
                    className={styles.sliderBtn}
                    aria-label="Previous image"
                  >
                    &#10094;
                  </button>
                )}

                <div className={styles.sliderMain}>
                  {currentImage ? (
                    /* keyをURLやIndexにすることで、変更時に再マウントされアニメーションが走る */
                    <div key={activeImageIndex} className={styles.fadeImage}>
                      <Image
                        src={currentImage.url}
                        alt={data.title}
                        width={currentImage.width}
                        height={currentImage.height}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ padding: "3rem 0", textAlign: "center" }}>
                      <span className={styles.dummyText}>NO IMAGE</span>
                    </div>
                  )}
                </div>

                {data.gallery.length > 1 && (
                  <button
                    onClick={handleNext}
                    className={styles.sliderBtn}
                    aria-label="Next image"
                  >
                    &#10095;
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* サムネイル・フッターエリア */}
        <div className={styles.galleryFooter}>
          {data.gallery.map((g, i) => (
            <div
              key={g.url + i}
              className={styles.galleryThumb}
              onClick={() => setActiveImageIndex(i)}
            >
              <Image
                src={g.url}
                alt={`Gallery ${i}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
          {/* 必要ならREAD MORE等を配置 */}
        </div>
      </div>
    </section>
  );
};

// --- メインコンポーネント ---
export default function HistoryClient({ contentData }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const [pathD, setPathD] = useState("");
  const [pathLength, setPathLength] = useState(0);
  const [drawLength, setDrawLength] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateSvgPath = useCallback(() => {
    if (!containerRef.current) return;
    if (sectionRefs.current.length === 0) return;

    const w = containerRef.current.offsetWidth;
    const h = containerRef.current.offsetHeight;

    const points = contentData.map((_, i) => {
      const sec = sectionRefs.current[i];
      if (!sec) return { x: w / 2, y: 0 };

      const isLayoutLeft = i % 2 === 0;
      const targetX = isLayoutLeft ? w * 0.9 : w * 0.1;
      const targetY = sec.offsetTop + sec.offsetHeight / 2;
      return { x: targetX, y: targetY };
    });

    let d = `M ${w / 2} 0 `;
    points.forEach((p, i) => {
      const prev = i === 0 ? { x: w / 2, y: 0 } : points[i - 1];
      const cpY1 = prev.y + (p.y - prev.y) * 0.5;
      const cpY2 = p.y - (p.y - prev.y) * 0.5;
      d += `C ${prev.x} ${cpY1}, ${p.x} ${cpY2}, ${p.x} ${p.y} `;
    });

    if (points.length > 0) {
      const last = points[points.length - 1];
      d += `L ${last.x} ${h} `;
    }
    setPathD(d);
  }, [contentData]);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationFrameId: number;
    const resizeObserver = new ResizeObserver(() => {
      animationFrameId = requestAnimationFrame(() => {
        updateSvgPath();
      });
    });

    resizeObserver.observe(containerRef.current);
    updateSvgPath();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [updateSvgPath, isMounted]);

  useEffect(() => {
    if (!pathRef.current || !pathD) return;
    try {
      const len = pathRef.current.getTotalLength();
      if (len && !isNaN(len)) {
        setPathLength(len);
      }
    } catch (e) {
      console.warn("Path calc error ignored");
    }
  }, [pathD]);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight - winHeight;
      const percent = docHeight > 1 ? scrollTop / docHeight : 0;

      setDrawLength(pathLength * Math.min(percent * 1.2, 1));

      sectionRefs.current.forEach((sec) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top < winHeight * 0.75) {
          sec.classList.add(styles.active);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathLength, isMounted]);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.bgTextLayer}>HISTORY</div>

      <div className={styles.svgLayer}>
        {isMounted && (
          <svg
            width="100%"
            height="100%"
            style={{ overflow: "visible", display: "block" }}
            pointerEvents="none"
          >
            <path d={pathD} className={styles.pathBg} />
            <path
              ref={pathRef}
              d={pathD}
              className={styles.pathMain}
              style={{
                opacity: pathLength > 0 ? 1 : 0,
                strokeDasharray: pathLength || 1,
                strokeDashoffset: Math.max(0, pathLength - drawLength),
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
          </svg>
        )}
      </div>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            HISTORY OF<br />
            <span style={{ color: "#E60012" }}>CR SF6</span>
          </h1>
          <p>SCROLL TO EXPLORE</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        {contentData.map((data, index) => (
          <HistorySection
            key={data.id}
            data={data}
            index={index}
            setSectionRef={(el) => {
              if (el) sectionRefs.current[index] = el;
            }}
          />
        ))}
      </main>

      <footer className={styles.footer}>
        <Link href="/" className={styles.backBtn}>
          BACK TO HOME
        </Link>
      </footer>
    </div>
  );
}