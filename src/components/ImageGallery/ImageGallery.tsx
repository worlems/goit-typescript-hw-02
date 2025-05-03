import { UnsplashImage } from "../../types/unsplash";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (image: UnsplashImage) => void;
}

function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} className={styles.item}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
