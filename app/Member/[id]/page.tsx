import Image from "next/image";
import Link from "next/link";
import { getteammember } from "../../libs/microcms";
// page.module.cssのパスを正しく指定してください。
// 例: appディレクトリの直下にある場合
import styles from "./page.module.css"; 

type Props = {
    params: {
        id: string;
    };
};

export default async function Page({ params }: Props) {
    const data = await getteammember(params.id);
    return (
        <main className={styles.profilePageContainer}>
            <div className={styles.profileGrid}>
                {/* 左側: プロフィール画像 */}
                <div className={styles.profileImageContainer}>
                    {data.image ? (
                        <Image
                            src={data.image.url}
                            alt={`${data.name}のプロフィール画像`}
                            width={500}
                            height={500}
                            className={styles.profileImage}
                            priority
                        />
                    ) : (
                        <div className={styles.noImagePlaceholder}>
                            <span>NO IMAGE</span>
                        </div>
                    )}
                    {/* デザイン用の装飾フレーム */}
                    <div className={styles.imageFrame}></div>
                </div>

                {/* 右側: テキスト情報 */}
                <div className={styles.profileInfoContainer}>
                    {/* 名前（グリッチエフェクト付き） */}
                    <h1 className={styles.playerName}>
                        <span data-text={data.name}>{data.name}</span>
                    </h1>

                    <div className={styles.infoGrid}>
                        {data.usechara && (
                            <section className={styles.infoBlock}>
                                <h2 className={styles.infoTitle}>MAIN CHARACTER</h2>
                                <p className={styles.infoText}>{data.usechara}</p>
                            </section>
                        )}
                        {data.info && (
                             <section className={styles.infoBlock}>
                                <h2 className={styles.infoTitle}>INFORMATION</h2>
                                <p className={styles.infoText}>{data.info}</p>
                            </section>
                        )}
                        {data.career && (
                            <section className={styles.infoBlock}>
                                <h2 className={styles.infoTitle}>CAREER</h2>
                                <p className={styles.infoText}>{data.career}</p>
                            </section>
                        )}
                    </div>
                    
                    {/* SNSリンク */}
                    <div className={styles.socialLinksContainer}>
                        {data.x_url && (
                            <Link href={data.x_url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                X (Twitter)
                            </Link>
                        )}
                        {data.youtube_url && (
                            <Link href={data.youtube_url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                YouTube
                            </Link>
                        )}
                        {data.twitch_url && (
                            <Link href={data.twitch_url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Twitch
                            </Link>
                        )}
                    </div>
                </div>
            </div>
             {/* 一覧ページへ戻るリンク */}
             <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <Link href="/" className={styles.officialSiteLink}>
                    &lt; メンバー一覧へ戻る
                </Link>
            </div>
        </main>
    );
}