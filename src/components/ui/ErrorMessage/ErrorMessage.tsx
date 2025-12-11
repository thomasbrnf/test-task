import "./ErrorMessage.scss";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <span className="error-message__text">{message}</span>
    </div>
  );
};

export default ErrorMessage;