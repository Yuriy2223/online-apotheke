"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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
  const getInitialLimit = useCallback(() => {
    if (!responsiveLimits) return 10;

    if (typeof window === "undefined") return responsiveLimits.desktop || 12;

    const width = window.innerWidth;
    if (width < 768) return responsiveLimits.mobile || 6;
    if (width < 1440) return responsiveLimits.tablet || 8;
    return responsiveLimits.desktop || 12;
  }, [responsiveLimits]);

  const [deviceLimit, setDeviceLimit] = useState(getInitialLimit);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!responsiveLimits || typeof window === "undefined") return;

    const updateLimit = () => {
      const width = window.innerWidth;
      let newLimit: number;

      if (width < 768) {
        newLimit = responsiveLimits.mobile || 6;
      } else if (width < 1440) {
        newLimit = responsiveLimits.tablet || 8;
      } else {
        newLimit = responsiveLimits.desktop || 12;
      }

      setDeviceLimit((prev) => (prev !== newLimit ? newLimit : prev));
    };

    if (!isInitialized.current) {
      updateLimit();
      isInitialized.current = true;
    }

    let timeoutId: NodeJS.Timeout;
    const debouncedUpdateLimit = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateLimit, 150);
    };

    window.addEventListener("resize", debouncedUpdateLimit);

    return () => {
      window.removeEventListener("resize", debouncedUpdateLimit);
      clearTimeout(timeoutId);
    };
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

  useEffect(() => {
    if (updateUrl && urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
  }, [urlPage, updateUrl, currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPage) return;

      setCurrentPage(page);

      if (updateUrl) {
        const params = new URLSearchParams(searchParams);
        params.set(pageParamName, page.toString());
        router.push(`?${params.toString()}`);
      }
    },
    [router, searchParams, updateUrl, pageParamName, currentPage]
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
