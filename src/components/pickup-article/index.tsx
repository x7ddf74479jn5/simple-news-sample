import dayjs from "src/lib/dayjs";
import type { ArticleType } from "src/types";

import styles from "./index.module.scss";

interface Props {
  articles: ArticleType[];
}

const PickupArticle: React.VFC<Props> = ({ articles }) => {
  const now = dayjs();
  return (
    <section className={styles.pickup}>
      <h1 className={styles.article__heading}>PickUp</h1>
      {articles.map((article, index) => {
        const time =
          dayjs(article.publishedAt || now)
            .fromNow()
            .slice(0, 1) == "a"
            ? 1
            : dayjs(article.publishedAt || now)
                .fromNow()
                .slice(0, 1);
        return (
          <a href={article.url} key={index} target="_blank" rel="noopener noreferrer">
            <article className={styles.article__main}>
              <div className={styles.article__title}>
                <p>{article.title}</p>
                <p className={styles.article__time}>{time}時間前</p>
              </div>
              {article.urlToImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={index} src={article.urlToImage} className={styles.article__img} alt="Article Image" />
              )}
            </article>
          </a>
        );
      })}
    </section>
  );
};

export default PickupArticle;
