import { UnsplashImage } from "../../types/unsplash";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  image: UnsplashImage;
  onClick: (image: UnsplashImage) => void;
}

function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div className={styles.card} onClick={() => onClick(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Unsplash image"}
        className={styles.image}
      />
    </div>
  );
}

export default ImageCard;
