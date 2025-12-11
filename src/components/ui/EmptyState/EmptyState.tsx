import "./EmptyState.scss";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({
  message = "За вашим запитом турів не знайдено",
}: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <span className="empty-state__text">{message}</span>
    </div>
  );
};

export default EmptyState;
