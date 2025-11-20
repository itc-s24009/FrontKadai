"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

// 親から受け取るPropsの型定義
type TeamData = {
  teamName: string;
  officialSiteUrl: string;
  division: {
    name: string;
    Department_sf6Url: string;
  };
  game: {
    title: string;
    description: string;
    imageUrl: string;
    officialSiteUrl: string;
  };
  introduction: {
    title: string;
    sub: string;
    description: string;
    detailUrl: string;
  };
};

type Props = {
  teamData: TeamData;
  members: any[]; // microcmsの型定義に合わせて適宜調整
};

export default function HomeClient({ teamData, members }: Props) {
  
  // スクロールアニメーションの監視
  useEffect(() => {
    const targets = document.querySelectorAll(`.${styles.fadeUpTarget}`);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.inView);
        }
      });
    }, {
      rootMargin: "0px 0px -100px 0px", // 画面の下100pxに入ったら発火
      threshold: 0.1,
    });

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* 全体装飾 (縦ライン) */}
      <div className={styles.globalDecoration}>
        <div className={styles.vLine}></div>
        <div className={styles.vLine}></div>
        <div className={styles.vLine}></div>
        <div className={styles.vLine}></div>
      </div>

      {/* 1. ヒーローセクション */}
      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTeamName}>
            CRAZY <br />
            <span>RACCOON</span>
          </h1>
          <div className={styles.heroDivisionWrapper}>
            <span className={styles.divisionName}>{teamData.division.name}</span>
            <Link
              href={teamData.officialSiteUrl}
              target="_blank"
              className={styles.btnStyler}
            >
              OFFICIAL SITE
            </Link>
          </div>
        </div>
        {/* スクロール誘導アイコン */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine}></div>
          SCROLL
        </div>
      </header>

      {/* 2. ゲーム情報セクション */}
      <section className={styles.sectionFullWidth}>
        <div className={styles.marqueeWrapper}>
           {/* 背景装飾としての動く文字 */}
           <div className={styles.marqueeText}>
             STREET FIGHTER 6 &nbsp; STREET FIGHTER 6 &nbsp; STREET FIGHTER 6 &nbsp;
           </div>
        </div>

        <div className={`${styles.gameContainer} ${styles.fadeUpTarget}`}>
          <div className={styles.gameContent}>
            <div className={styles.gameImageWrapper}>
              <Image
                src={teamData.game.imageUrl}
                alt="Game Logo"
                width={300}
                height={300}
                className={styles.gameLogo}
              />
            </div>
            <div className={styles.gameInfo}>
              <span className={styles.sectionLabel}>PLAYING TITLE</span>
              <h3 className={styles.gameTitle}>{teamData.game.title}</h3>
              <p className={styles.description}>{teamData.game.description}</p>
              <Link href={teamData.game.officialSiteUrl} target="_blank" className={styles.btnStyler}>
                VIEW OFFICIAL SITE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. チーム紹介 */}
      <section className={`${styles.sectionFullWidth} ${styles.bgDarkWrapper}`}>
        <div className={styles.bgShape}></div>
        <div className={`${styles.aboutContainer} ${styles.fadeUpTarget}`}>
          <div className={styles.aboutText}>
            <span className={styles.sectionLabel}>WHO WE ARE</span>
            <h2 className={styles.aboutBigTitle}>
              ABOUT <br /> <span className={styles.textStroke}>TEAM</span>
            </h2>
            <h4 className={styles.aboutSub}>{teamData.introduction.sub}</h4>
            <p className={styles.description}>{teamData.introduction.description}</p>
            <Link href={teamData.introduction.detailUrl} className={styles.btnStyler}>
              MORE DETAILS
            </Link>
          </div>
          {/* 右側になにかグラフィックや動画などが入るとさらに良い空間 */}
        </div>
      </section>

      {/* 4. メンバー */}
      <main className={styles.sectionFullWidth}>
        <div className={styles.membersContainer}>
          <div className={styles.fadeUpTarget}>
            <h2 className={styles.aboutBigTitle} style={{ fontSize: '4rem', marginBottom: '1rem' }}>ROSTER</h2>
            <p style={{color: '#888'}}>Pro Players </p>
          </div>

          {members.length === 0 ? (
            <p>No Members</p>
          ) : (
            <ul className={styles.memberGrid}>
              {members.map((member, index) => (
                <li 
                  key={member.id} 
                  className={`${styles.memberCard} ${styles.fadeUpTarget}`}
                  // 順番にふわっと出すためにstyleでdelayを設定
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <Link href={`/Member/${member.id}`} style={{display:'block'}}>
                    <div className={styles.memberImageWrapper}>
                      <Image
                        src={member.image.url}
                        alt={member.name}
                        width={member.image.width}
                        height={member.image.height}
                        className={styles.memberImage}
                      />
                      <div className={styles.memberNameOverlay}>
                        <h3 className={styles.memberName}>{member.name}</h3>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <p>&copy; {teamData.teamName} All Rights Reserved.</p>
      </footer>
    </div>
  );
}