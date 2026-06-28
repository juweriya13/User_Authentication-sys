export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  error = "",
}) {
  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-small text-gray-700 mb-1">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm
        transition duration-200
        bg-white
        ${
          error
            ? "border-red-400 focus:ring-red-400 focus:border-red-400"
            : "border-gray-300 focus:ring-pink-500 focus:border-pink-500"
        }
        focus:outline-none focus:ring-2`}
      />

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}