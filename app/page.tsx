import { getteamList } from "./libs/microcms";
import HomeClient from "./components/HomeClient";

// 固定データ定義
const teamData = {
  teamName: "Crazy Raccoon",
  officialSiteUrl: "https://crazyraccoon.jp/",
  division: {
    name: "STREET FIGHTER 6 DIV.",
    Department_sf6Url: "https://crazyraccoon.jp/member-team/street-fighter/",
  },
  game: {
    title: "Street Fighter 6",
    description:
      "2023/6/2 CAPCOMが発売した対戦型格闘ゲーム Street Fighter(ストリートファイター)シリーズの最新作。革新的なシステムとグラフィックで新たなEsportsのスタンダードを確立。",
    imageUrl: "/sf6-logo.png", 
    officialSiteUrl: "https://www.streetfighter.com/6/ja-jp",
  },
  introduction: {
    title: "ABOUT TEAM",
    sub: "We make gamers look cool.",
    description:
      "「ゲーマーをかっこよく魅せる」というテーマを掲げ、Esportsの発展を目的として活動するプロゲーミングチームです。全員が主役を張れる圧倒的な実力と\"オワッてる\"ほどの愉快さと面白さを兼ね備えたメンバーが所属しています。",
    detailUrl: "/About",
  },
};

// Server Component
export default async function Home() {
  const teamlist = await getteamList({ limit: 12 });

  return (
    <HomeClient 
      teamData={teamData} 
      members={teamlist.contents} 
    />
  );
}