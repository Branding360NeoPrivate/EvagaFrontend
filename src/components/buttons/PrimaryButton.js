function PrimaryButton({ children, className, onClick }) {
  return (
    <button className={`btn-primary ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default PrimaryButton;
