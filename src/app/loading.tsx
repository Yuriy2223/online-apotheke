export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-light mb-4"></div>

        <h2 className="text-xl font-semibold text-gray-dark mb-2">
          Loading...
        </h2>
        <p className="text-gray-dark">Please wait</p>
      </div>
    </div>
  );
}
