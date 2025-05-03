import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <div className={styles.wrapper}>
      <button onClick={onClick} className={styles.button}>
        Load more
      </button>
    </div>
  );
}

export default LoadMoreBtn;
