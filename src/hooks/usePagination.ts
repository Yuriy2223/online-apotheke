"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface UsePaginationProps {
  initialPage?: number;
  updateUrl?: boolean;
  pageParamName?: string;
  responsiveLimits?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const useDeviceLimit = (
  responsiveLimits?: UsePaginationProps["responsiveLimits"]
) => {
  const [deviceLimit, setDeviceLimit] = useState(10);

  useEffect(() => {
    if (!responsiveLimits) return;

    const updateLimit = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDeviceLimit(responsiveLimits.mobile || 6);
      } else if (width < 1440) {
        setDeviceLimit(responsiveLimits.tablet || 8);
      } else {
        setDeviceLimit(responsiveLimits.desktop || 12);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, [responsiveLimits]);

  return deviceLimit;
};

export const usePagination = ({
  initialPage = 1,
  updateUrl = true,
  pageParamName = "page",
  responsiveLimits,
}: UsePaginationProps = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deviceLimit = useDeviceLimit(responsiveLimits);

  const urlPage = parseInt(searchParams.get(pageParamName) || "1", 10);
  const [currentPage, setCurrentPage] = useState(
    updateUrl ? urlPage : initialPage
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);

      if (updateUrl) {
        const params = new URLSearchParams(searchParams);
        params.set(pageParamName, page.toString());
        router.push(`?${params.toString()}`);
      }
    },
    [router, searchParams, updateUrl, pageParamName]
  );

  const buildApiUrl = useCallback(
    (baseUrl: string, additionalParams: Record<string, string> = {}) => {
      const params = new URLSearchParams();

      params.set("page", currentPage.toString());

      params.set("limit", deviceLimit.toString());

      searchParams.forEach((value, key) => {
        if (key !== pageParamName) {
          params.set(key, value);
        }
      });

      Object.entries(additionalParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      });

      return `${baseUrl}?${params.toString()}`;
    },
    [currentPage, deviceLimit, searchParams, pageParamName]
  );

  const paginationInfo = useMemo(
    () => ({
      currentPage,
      deviceLimit,
      handlePageChange,
      buildApiUrl,
    }),
    [currentPage, deviceLimit, handlePageChange, buildApiUrl]
  );

  return paginationInfo;
};
