import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

interface ErrorConfigItem {
  message?: string;
  toastId: string;
}

interface ErrorConfig {
  [key: string]: ErrorConfigItem;
}

const defaultErrorConfig: ErrorConfig = {
  email_exists_local: {
    toastId: "email_exists_local",
  },
  google_auth_failed: {
    message: "Google authentication failed",
    toastId: "google_auth_failed",
  },
  no_auth_code: {
    message: "Google authentication code not received",
    toastId: "no_auth_code",
  },
  server_error: {
    toastId: "server_error",
  },
  default: {
    toastId: "default_error",
    message: "An error occurred",
  },
};

function getErrorConfigItem(
  config: ErrorConfig,
  errorKey: string
): ErrorConfigItem {
  return config[errorKey] ?? config["default"];
}

function sanitizeErrorConfig(
  partialConfig?: Partial<ErrorConfig>
): ErrorConfig {
  const result: ErrorConfig = {};
  if (partialConfig) {
    for (const key in partialConfig) {
      const value = partialConfig[key];
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result;
}

export function useUrlErrorHandler(
  customErrorConfig?: Partial<ErrorConfig>,
  delay: number = 50
) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if (error && message) {
      const decodedMessage = decodeURIComponent(message);
      const mergedConfig = {
        ...defaultErrorConfig,
        ...sanitizeErrorConfig(customErrorConfig),
      };

      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      setTimeout(() => {
        const config = getErrorConfigItem(mergedConfig, error);
        const finalMessage = config.message || decodedMessage;
        toast.error(finalMessage, { toastId: config.toastId });
      }, delay);
    }
  }, [searchParams, customErrorConfig, delay]);
}
