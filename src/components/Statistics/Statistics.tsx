import { Package, Truck, Users } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardStatistics } from "@/redux/dashboard-statistics/operations";
import {
  selectStatistics,
  selectStatisticsLoading,
  selectStatisticsError,
} from "@/redux/dashboard-statistics/selectors";

export function Statistics() {
  const dispatch = useAppDispatch();
  const statistics = useAppSelector(selectStatistics);
  const isLoading = useAppSelector(selectStatisticsLoading);
  const error = useAppSelector(selectStatisticsError);

  const iconMap = {
    Package,
    Truck,
    Users,
  };

  useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white-true rounded-lg p-6 border border-gray-light animate-pulse"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gray-light rounded"></div>
              <div className="h-4 bg-gray-light rounded w-24"></div>
            </div>
            <div className="h-8 bg-gray-light rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-dark">Error loading statistics: {error}</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mb-6" role="list">
      {statistics.map(({ icon, label, value }, index) => {
        const Icon = iconMap[icon];
        return (
          <li
            key={index}
            className="bg-white-true rounded-lg p-6 border border-gray-light transition-all duration-200 
            cursor-pointer hover:border-green-light hover:shadow-sm"
            role="group"
            aria-label={label}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="text-gray-dark" aria-hidden="true">
                <Icon size={24} strokeWidth={2} />
              </div>
              <span className="text-sm text-gray-dark">{label}</span>
            </div>
            <strong
              className="text-2xl font-semibold text-black-true"
              aria-live="polite"
            >
              {value.toLocaleString()}
            </strong>
          </li>
        );
      })}
    </ul>
  );
}
