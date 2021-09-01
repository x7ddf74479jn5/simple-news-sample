import Header from "../components/header";
import styles from "./index.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default MainLayout;
