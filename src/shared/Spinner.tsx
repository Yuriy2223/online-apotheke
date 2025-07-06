import React from "react";

export const Spinner = () => {
  return (
    <div className="min-h-vh bg-gray-light">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-light mx-auto mb-4"></div>
          {/* <p className="text-gray-dark">Loading ...</p> */}
        </div>
      </div>
    </div>
  );
};
