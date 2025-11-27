// app/about/page.tsx

import { getHistoryList } from "../libs/microcms";
import HistoryClient, { FormattedHistoryContent } from "../components/HistoryClient";

export const revalidate = 60;

export default async function AboutPage() {
  const response = await getHistoryList();

  const formattedData: FormattedHistoryContent[] = response.contents.map((item) => {
    
    // paragraphs の処理 (改行コードで分割)
    const paragraphArray = typeof item.paragraphs === 'string' 
      ? item.paragraphs.split("\n") 
      : [];

    // stats の処理
    // MicroCMSの「繰り返し」フィールドを使っていれば、既に配列 {label, value} になっています
    // 念のため配列が存在するかチェックしてマップします
    const statsArray = Array.isArray(item.stats) 
      ? item.stats.map((stat) => ({
          label: stat.label,
          value: stat.value
        }))
      : [];

    return {
      id: item.id,
      label: item.label,
      title: item.title,
      subtitle: item.subtitle,
      intro: item.intro,
      paragraphs: paragraphArray,
      stats: statsArray,
      gallery: item.gallery,
    };
  });

  return <HistoryClient contentData={formattedData} />;
}