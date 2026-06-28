export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center px-2 py-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-2xl border border-pink-80 overflow-hidden">

          {/* Header */}
          <div className="text-center px-8 pt-8 pb-4">

            <h1 className="text-2xl font-semibold text-gray-800">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-2 text-gray-500 text-base">
                {subtitle}
              </p>
            )}

          </div>

          {/* Form */}
          <div className="px-8 pb-8">

            {children}

          </div>

        </div>

      </div>

    </div>
  );
}