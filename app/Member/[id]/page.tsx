import Image from "next/image";
import Link from "next/link";
import { getteammember } from "../../libs/microcms"; 
// ↑ パスは実際のプロジェクト構成に合わせて調整してください
import styles from "./page.module.css";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const data = await getteammember(params.id);

  return (
    <div className={styles.pageWrapper}>
      {/* --- 背景装飾: 動く縦ライン --- */}
      <div className={styles.globalDecoration}>
        <div className={styles.vLine}></div>
        <div className={styles.vLine}></div>
        <div className={styles.vLine}></div>
        <div className={styles.vLine}></div>
      </div>

      {/* --- 背景装飾: 巨大なプレイヤー名の透かし --- */}
      <div className={styles.bgBigName}>
        {data.id}
      </div>

      <main className={styles.container}>
        <div className={styles.contentGrid}>
          
          {/* --- 左側: プレイヤー画像セクション --- */}
          <div className={`${styles.imageSection} ${styles.fadeInUp}`}>
            <div className={styles.imageFrame}>
              {data.image ? (
                <Image
                  src={data.image.url}
                  alt={`${data.name}`}
                  width={800}
                  height={800}
                  className={styles.profileImage}
                  priority
                />
              ) : (
                <div className={styles.noImage}>NO IMAGE</div>
              )}
              {/* 画像に重なる装飾 */}
              <div className={styles.decorOverlay}>
                <span>PLAYER_ID // {params.id}</span>
              </div>
            </div>
          </div>

          {/* --- 右側: 情報セクション --- */}
          <div className={styles.infoSection}>
            
            {/* 名前 & 所属 */}
            <div className={`${styles.headerGroup} ${styles.fadeInUp}`} style={{ animationDelay: '0.1s' }}>
               <span className={styles.subLabel}>CR STREET FIGHTER 6 DIV.</span>
               <h1 className={styles.playerName}>
                 {data.name}
               </h1>
               <div className={styles.redSeparator}></div>
            </div>

            {/* SNSリンク (スタイリッシュなボタン) */}
            <div className={`${styles.socialGroup} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
              {data.x_url && (
                <Link href={data.x_url} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <span className={styles.socialIcon}>X</span> <span className={styles.socialText}>TWITTER</span>
                </Link>
              )}
              {data.youtube_url && (
                <Link href={data.youtube_url} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <span className={styles.socialIcon}>YT</span> <span className={styles.socialText}>YOUTUBE</span>
                </Link>
              )}
              {data.twitch_url && (
                <Link href={data.twitch_url} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <span className={styles.socialIcon}>TW</span> <span className={styles.socialText}>TWITCH</span>
                </Link>
              )}
            </div>

            {/* 情報詳細グリッド */}
            <div className={`${styles.detailsGrid} ${styles.fadeInUp}`} style={{ animationDelay: '0.3s' }}>
              {data.usechara && (
                <div className={styles.detailCard}>
                  <h3 className={styles.detailLabel}>MAIN CHARACTER</h3>
                  <p className={styles.detailValue}>{data.usechara}</p>
                </div>
              )}
              
              {data.info && (
                <div className={`${styles.detailCard} ${styles.fullWidth}`}>
                  <h3 className={styles.detailLabel}>INFORMATION</h3>
                  <p className={styles.detailText}>{data.info}</p>
                </div>
              )}
              
              {data.career && (
                <div className={`${styles.detailCard} ${styles.fullWidth}`}>
                  <h3 className={styles.detailLabel}>CAREER</h3>
                  <div className={styles.detailText}>{data.career}</div>
                </div>
              )}
            </div>
            
            {/* 戻るボタン */}
            <div className={`${styles.footerNav} ${styles.fadeInUp}`} style={{ animationDelay: '0.5s' }}>
              <Link href="/" className={styles.backButton}>
                &lt; BACK TO ROSTER
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}