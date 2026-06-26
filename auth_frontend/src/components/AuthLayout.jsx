export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex justify-center items-center p-6">

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
          {title}
        </h1>

        {children}

      </div>
    </div>
  );
}