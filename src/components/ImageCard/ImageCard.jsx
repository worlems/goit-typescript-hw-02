import styles from "./ImageCard.module.css";

function ImageCard({ image, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
      />
    </div>
  );
}

export default ImageCard;
