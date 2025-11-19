import Image from "next/image";
import Link from "next/link"; // 外部リンク用にLinkコンポーネントをインポート
import styles from "./page.module.css";
import { getteamList } from "./libs/microcms";
// これは固定データとしてページ上部に表示します
const teamData = {
teamName: "Crazy Raccoon",
officialSiteUrl: "https://crazyraccoon.jp/",
division: {
  name: "Street Fighter 6 部門",
  Department_sf6Url: "https://crazyraccoon.jp/member-team/street-fighter/"
  },
game: {
title: "Street Fighter 6",
description:
"s",
imageUrl: "/sf6-logo.png", // publicフォルダに画像を配置してください
officialSiteUrl: "https://www.streetfighter.com/6/ja-jp",
},
};
export default async function Home() {
// メンバーリストを取得
const teamlist = await getteamList({ limit: 12 }); // 表示件数を増やしたい場合はここを調整
return (
<div className={styles.container}>
{/* チーム情報ヘッダー */}
<header className={styles.teamHeader}>
<h1 className={styles.teamName}>{teamData.teamName}</h1>
<Link href={teamData.officialSiteUrl} target="_blank" rel="noopener noreferrer" className={styles.officialSiteLink}>
公式サイト
      </Link>
      <div className={styles.divisionInfo}>
              <Link href={teamData.division.Department_sf6Url}>

<h2 className={styles.divisionName}>{teamData.division.name}</h2>
            </Link>
</div>
</header>
{/* ゲーム情報セクション */}
  <section className={styles.gameSection}>
    <div className={styles.gameInfo}>
      <div className={styles.gameLogo}>
        <Image
          src={teamData.game.imageUrl}
          alt={`${teamData.game.title} Logo`}
          width={200} // ロゴのサイズに合わせて調整してください
          height={200} // ロゴのサイズに合わせて調整してください
        />
      </div>
      <div className={styles.gameDescription}>
        <h3 className={styles.gameTitle}>{teamData.game.title}</h3>
        <p className={styles.description}>{teamData.game.description}</p>
        <Link href={teamData.game.officialSiteUrl} target="_blank" rel="noopener noreferrer" className={styles.gameSiteLink}>
          ゲーム公式サイトへ
        </Link>
      </div>
    </div>
  </section>


  {/* メンバー紹介セクション */}
  <main className={styles.main}>
    <h2 className={styles.sectionTitle}>MEMBERS</h2>
    {teamlist.contents.length === 0 ? (
      <p className={styles.empty}>メンバーが登録されていません。</p>
    ) : (
      <ul className={styles.memberGrid}>
            {teamlist.contents.map((member) => (
            <li key={member.id} className={styles.memberCard}>
              <Link href={`/Member/${member.id}`}>
                  <Image
                    src={member.image.url}
                    alt={member.name}
                    width={member.image.width}
                    height={member.image.height}
                    className={styles.memberImage}
                  />
                  <p className={styles.memberName}>{member.name}</p>
                  </Link>
                </li>
        ))}
      </ul>
    )}
  </main>

</div>
);
}
