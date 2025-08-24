import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-dark mb-4">404</h1>
          <div className="w-24 h-1 bg-green-light mx-auto rounded"></div>
        </div>

        <h2 className="text-3xl font-bold text-black-true mb-4">
          Page not found
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Sorry, the page you are looking for does not exist.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-green-light text-white px-8 py-3 rounded-lg font-semibold
             hover:bg-green-dark transition-colors duration-200"
          >
            To the main page
          </Link>

          <div className="flex justify-center space-x-4 mt-4">
            <Link
              href="/register"
              className="text-green-light hover:text-green-dark font-medium transition-colors duration-200"
            >
              Registration
            </Link>
            <span className="text-gray-dark">|</span>
            <Link
              href="/login"
              className="text-green-light hover:text-green-dark font-medium transition-colors duration-200"
            >
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
