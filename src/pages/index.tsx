import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import type { ArticleType, WeatherNewsType } from "src/types";

import Article from "../components/article";
import Nav from "../components/nav";
import PickupArticle from "../components/pickup-article";
import WeatherNews from "../components/weather-news";
import MainLayout from "../layouts";
import styles from "../styles/Home.module.scss";

export const Home: NextPage<PageProps> = (props) => {
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main}>
          <Article title="headline" articles={props.topArticles} />
        </div>
        <div className={styles.aside}>
          <WeatherNews weatherNews={props.weatherNews} />
          <PickupArticle articles={props.pickupArticles} />
        </div>
      </div>
    </MainLayout>
  );
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
type StaticProps = { topArticles: ArticleType[]; weatherNews: WeatherNewsType; pickupArticles: ArticleType[] };

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  // NewsAPIのトップ記事の情報を取得
  const pageSize = 10; //取得する記事の数
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_API_KEY}`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  // OpenWeatherMapの天気の情報を取得
  const lat = 35.4122; // 取得したい地域の緯度と経度(今回は東京)
  const lon = 139.413;
  const exclude = "hourly,minutely"; // 取得しない情報(1時間ごとの天気情報と1分間ごとの天気情報)
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  // NewsAPIのピックアップ記事の情報を取得
  const keyword = "software"; // キーワードで検索(ソフトウェア)
  const sortBy = "popularity"; // 表示順位(人気順)
  const pickupPageSize = 5; // ページサイズ(5)
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&language=jp&sortBy=${sortBy}&pageSize=${pickupPageSize}&apiKey=${process.env.NEWS_API_API_KEY}`
  );
  const pickupJson = await pickupRes.json();
  const pickupArticles = pickupJson?.articles;

  return {
    props: {
      topArticles,
      weatherNews,
      pickupArticles,
    },
    revalidate: 60,
  };
};

export default Home;
