export default function Modal({
  title,
  buttonText,
  isOpen,
  children,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_open">
      <h2>{title}</h2>
      {children}
      <button onClick={onSubmit}>{buttonText}</button>
    </div>
  );
}
