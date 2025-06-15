export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Завантаження...
        </h2>
        <p className="text-gray-500">Будь ласка, зачекайте</p>
      </div>
    </div>
  );
}
