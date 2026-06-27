export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium text-gray-700">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
}