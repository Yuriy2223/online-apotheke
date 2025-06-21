import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Сторінка не знайдена
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Вибачте, сторінка, яку ви шукаєте, не існує.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            На головну
          </Link>

          <div className="flex justify-center space-x-4 mt-4">
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Реєстрація
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Вхід
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
