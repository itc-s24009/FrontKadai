"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const [pathD, setPathD] = useState("");
  const [pathLength, setPathLength] = useState(0);
  const [drawLength, setDrawLength] = useState(0);
  
  const [isMounted, setIsMounted] = useState(false);

  const contentData = [
    {
      id: "crcup",
      label: "01 // EVENT",
      title: "CR CUP",
      subtitle: "THE BIGGEST INFLUENCER TOURNAMENT",
      intro: "「ゲーマーをかっこよく魅せる」理念のもと、コミュニティに新たな熱狂を。",
      paragraphs: [
        "Crazy Raccoon Cup（通称CRカップ）は、Esportsの裾野を広げるという目的のもとに発足しました。ストリーマー、プロゲーマー、VTuber、タレントなど、多様なジャンルのトップインフルエンサーがチームを組み、優勝を目指して戦います。",
        "予選期間中の「スクリム（練習試合）」から生まれるドラマ、コーチとの師弟関係、そして本番での奇跡的な逆転劇。それらすべてがエンターテインメントとして昇華され、Twitterトレンドを世界規模で席巻することも珍しくありません。",
        "STREET FIGHTER 6においては、格闘ゲーム未経験の配信者たちが数日間の猛特訓を経て劇的に成長する姿が多くの感動を呼び、新規プレイヤー参入の大きなきっかけとなりました。"
      ],
      stats: [
        { label: "TOTAL VIEWERS", value: "550k+" },
        { label: "PARTICIPANTS", value: "100+" },
        { label: "STATUS", value: "LEGENDARY" }
      ],
      gallery: ["SCENE 01", "SCENE 02", "SCENE 03"]
    },
    {
      id: "sfl2024",
      label: "02 // 2024 SEASON",
      title: "SFL 2024",
      subtitle: "STREET FIGHTER LEAGUE Pro-JP 2024",
      intro: "激動の新体制。嵐の中、彼らは真の「強さ」を証明した。",
      paragraphs: [
        "2024年シーズン、Crazy Raccoon SF6部門はかつてない変革の時を迎えました。長年チームを支えたメンバーに加え、海外シーンで猛威を振るう若き才能を獲得。データアナリスト部門の設立など、バックアップ体制も盤石にしました。",
        "リーグ戦序盤は連携不足や環境への適応に苦しむ場面も見られましたが、中盤からの追い上げは圧巻の一言。特にリーダーKazunoko選手による逆転の3タテ劇は、SFL史に残る名場面として語り継がれています。",
        "ただ勝つだけではない、魅せて勝つ。CRの理念を体現し続けた彼らの戦いは、赤いユニフォームを纏ったファンたちの声援に支えられ、プレイオフ進出という形で結実しました。"
      ],
      stats: [
        { label: "TEAM RANK", value: "TOP 3" },
        { label: "BEST BOUT", value: "vs DFM" },
        { label: "WIN RATE", value: "68%" }
      ],
      gallery: ["HIGHLIGHT 01", "HIGHLIGHT 02"]
    },
    {
      id: "sfl2025",
      label: "03 // FUTURE",
      title: "SFL 2025",
      subtitle: "ROAD TO THE WORLD CHAMPION",
      intro: "すべては世界一のために。CRの進化は止まらない。",
      paragraphs: [
        "過去のデータを全てリセットする覚悟で、2025年シーズンの準備は始まっています。私たちは「国内最強」の称号では満足しません。目指すのは文字通り、世界一のクラブチームです。",
        "新たなトレーニング施設の開設、メンタルトレーナーの導入、そしてファンの皆様とのより深い交流イベントの企画。競技面だけでなく、Esportsカルチャーそのものを牽引する存在として、さらなる高みを目指します。",
        "Next Stage is Coming. 歴史の証人となるのは、あなたです。"
      ],
      stats: [
        { label: "MISSION", value: "CHAMPION" },
        { label: "KEYWORD", value: "EVOLVE" },
        { label: "PHASE", value: "Loading..." }
      ],
      gallery: ["CONCEPT 01", "CONCEPT 02"]
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => { updateSvgPath(); });
    resizeObserver.observe(containerRef.current);
    updateSvgPath();
    return () => resizeObserver.disconnect();
  }, [isMounted]);

  const updateSvgPath = () => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    const h = containerRef.current.offsetHeight;

    const points = sectionRefs.current.map((sec, i) => {
      if (!sec) return { x: w / 2, y: 0 };
      const isLayoutLeft = i % 2 === 0; 
      const targetX = isLayoutLeft ? w * 0.9 : w * 0.1;
      const targetY = sec.offsetTop + (sec.offsetHeight / 2);
      return { x: targetX, y: targetY };
    });

    let d = `M ${w/2} 0 `; 
    points.forEach((p, i) => {
      const prev = i === 0 ? { x: w/2, y: 0 } : points[i - 1];
      const cpY1 = prev.y + (p.y - prev.y) * 0.5;
      const cpY2 = p.y - (p.y - prev.y) * 0.5;
      d += `C ${prev.x} ${cpY1}, ${p.x} ${cpY2}, ${p.x} ${p.y} `;
    });
    if(points.length > 0) {
       const last = points[points.length - 1];
       d += `L ${last.x} ${h} `;
    }
    setPathD(d);
  };

  useEffect(() => {
    if (!pathRef.current) return;
    try {
      const len = pathRef.current.getTotalLength();
      // 長さが極端に短い・0の場合はセットしない等のガードも可能
      if(len > 0) setPathLength(len);
    } catch (e) { console.warn("Path calc error"); }
  }, [pathD]);

  useEffect(() => {
    if(!isMounted) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight - winHeight;
      const percent = docHeight > 0 ? scrollTop / docHeight : 0;
      
      setDrawLength(pathLength * (Math.min(percent * 1.2, 1)));

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
             style={{ overflow: 'visible', display: 'block' }}
             pointerEvents="none"
          >
            <path d={pathD} className={styles.pathBg} />
            <path 
              ref={pathRef}
              d={pathD} 
              className={styles.pathMain}
              style={{ 
                // ■ 修正: パス長が未確定のときは非表示(opacity: 0)
                opacity: pathLength > 0 ? 1 : 0,
                // ■ 修正: 長さが0のとき実線化するのを防ぐため 1 をデフォルトに
                strokeDasharray: pathLength || 1,
                strokeDashoffset: Math.max(0, pathLength - drawLength),
                // フワッと表示されるようにtransitionを追加
                transition: 'opacity 0.3s ease, stroke-dashoffset 0.1s linear'
              }}
            />
          </svg>
        )}
      </div>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>HISTORY OF<br /><span style={{color:'#E60012'}}>CR SF6</span></h1>
          <p>SCROLL TO EXPLORE</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        {contentData.map((data, index) => {
          const isLayoutLeft = index % 2 === 0;
          return (
            <section 
              key={data.id}
              ref={(el) => { sectionRefs.current[index] = el; }}
              className={`${styles.section} ${isLayoutLeft ? styles.layoutLeft : styles.layoutRight}`}
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
                        <p key={i} className={styles.paragraph}>{txt}</p>
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
                        <div className={styles.visualInner}>
                           <span className={styles.dummyText}>MAIN VISUAL</span>
                        </div>
                      </div>
                   </div>
                </div>
                <div className={styles.galleryFooter}>
                   {data.gallery.map((g, i) => (
                     <div key={i} className={styles.galleryThumb}>
                        <span className={styles.dummyTextMin}>{g}</span>
                     </div>
                   ))}
                   <div className={styles.readMore}>READ MORE &rarr;</div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <footer className={styles.footer}>
         <Link href="/" className={styles.backBtn}>BACK TO HOME</Link>
      </footer>

    </div>
  );
}