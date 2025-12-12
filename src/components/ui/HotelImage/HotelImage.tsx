import clsx from "clsx";
import "./HotelImage.scss";

interface HotelImageProps {
  src?: string | null;
  alt?: string;
  size?: "small" | "large";
  loading?: "lazy" | "eager";
  className?: string;
}

const HotelImage = ({
  src,
  alt = "",
  size = "small",
  loading = "lazy",
  className,
}: HotelImageProps) => {
  if (!src) {
    return (
      <div
        className={clsx(
          "hotel-image__placeholder",
          `hotel-image--${size}`,
          className,
        )}
      />
    );
  }

  return (
    <img
      className={clsx("hotel-image__img", `hotel-image--${size}`, className)}
      src={src}
      alt={alt}
      loading={loading}
    />
  );
};

export default HotelImage;
