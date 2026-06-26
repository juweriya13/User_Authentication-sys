export default function Button({
  text,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 transition duration-300 shadow-lg ${className}`}
    >
      {text}
    </button>
  );
}