export function Statistics() {
  return (
    <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 gap-4 mb-6">
      <div className="bg-white-true rounded-lg p-6 border border-gray-light">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-gray-dark">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect
                x="2"
                y="2"
                width="12"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="5"
                y="5"
                width="6"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="text-sm text-gray-dark">All products</span>
        </div>
        <div className="text-2xl font-semibold text-black-true">8,430</div>
      </div>

      <div className="bg-white-true rounded-lg p-6 border border-gray-light">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-gray-dark">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="6"
                r="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="text-sm text-gray-dark">All suppliers</span>
        </div>
        <div className="text-2xl font-semibold text-black-true">211</div>
      </div>

      <div className="bg-white-true rounded-lg p-6 border border-gray-light">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-gray-dark">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="6"
                r="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="text-sm text-gray-dark">All customers</span>
        </div>
        <div className="text-2xl font-semibold text-black-true">140</div>
      </div>
    </div>
  );
}
