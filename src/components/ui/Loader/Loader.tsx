import "./Loader.scss";

interface LoaderProps {
  text?: string;
}

const Loader = ({ text = "Завантаження.." }: LoaderProps) => {
  return (
    <div className="loader">
      <div className="loader__spinner" />
      {text && <span className="loader__text">{text}</span>}
    </div>
  );
};

export default Loader;
