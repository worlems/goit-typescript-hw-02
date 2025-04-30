import Modal from "react-modal";
import styles from "./ImageModale.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

function ImageModal({ isOpen, onRequestClose, image }) {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={styles.image}
      />
      <div className={styles.info}>
        <p>
          <strong>Author:</strong> {image.user.name}
        </p>
        <p>
          <strong>Likes:</strong> {image.likes}
        </p>
        {image.description && (
          <p>
            <strong>Description:</strong> {image.description}
          </p>
        )}
      </div>
      <button onClick={onRequestClose} className={styles.closeButton}>
        <IoIosCloseCircleOutline size={35} />
      </button>
    </Modal>
  );
}

export default ImageModal;
