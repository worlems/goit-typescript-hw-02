import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModale/ImageModale";
import { UnsplashImage } from "../../types/unsplash";

interface UnsplashApiResponse {
  results: UnsplashImage[];
  total_pages: number;
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    if (!query) return;

    const fetchImages = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<UnsplashApiResponse>(
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
        const axiosError = err as AxiosError;
        if (axiosError.response?.status === 401) {
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

  const handleSearch = (newQuery: string): void => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: UnsplashImage): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
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
