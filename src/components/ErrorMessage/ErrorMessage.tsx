import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
