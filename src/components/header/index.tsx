import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.scss";

const Header: React.VFC = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__icon}>
          <Image src="/img/headerIcon/menu.png" alt="menu icon" loading="eager" width={35} height={35} priority />
        </div>
        <h1 className={styles.heading}>
          <Link href="/">
            <a>
              <span className={styles.typography__large}>Simple</span>
              <span className={styles.typography__medium}>News</span>
            </a>
          </Link>
        </h1>
      </header>
    </section>
  );
};

export default Header;
