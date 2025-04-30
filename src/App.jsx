import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModale/ImageModale";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query,
              page,
              per_page: 12,
              client_id: accessKey,
              orientation: "landscape",
            },
          }
        );

        if (page === 1) {
          setImages(response.data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        }

        setTotalPages(response.data.total_pages);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Invalid API key. Please check your configuration.");
        } else {
          setError("Failed to fetch images. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page, accessKey]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}

export default App;
