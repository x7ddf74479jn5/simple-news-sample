import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import type { ArticleType } from "src/types";

import Article from "../../components/article";
import Nav from "../../components/nav";
import MainLayout from "../../layouts/index";
import styles from "../../styles/Home.module.scss";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Topic: NextPage<PageProps> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <Head>
        <title>Simple News - {props.title.toUpperCase()}</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} style={{ marginRight: "10%" }}>
          <Article title={props.title} articles={props.topicArticles} />
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

type StaticProps = { topicArticles: ArticleType[]; title: string };
interface Params extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({ params }) => {
  if (!params) throw Error("Params is undefined");
  const topicRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&category=${params.id}&country=jp&apiKey=${process.env.NEWS_API_API_KEY}`
  );
  const topicJson = await topicRes.json();
  const topicArticles = await topicJson.articles;

  const title = params.id;

  return {
    props: { topicArticles, title },
    revalidate: 60 * 10,
  };
};

export default Topic;
