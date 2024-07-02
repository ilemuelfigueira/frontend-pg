"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

export const useAsyncRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [resolveRouteChanged, setResolveRouteChanged] = useState(null);

  useEffect(() => {
    resolveRouteChanged?.();
  }, [pathname]);

  const asyncRouter = useMemo(() => {
    const push = async (href, options) => {
      router.push(href, options);

      await new Promise((resolve) => {
        // wait for the route change to complete
        setResolveRouteChanged(resolve);
      });
    };

    return { ...router, push };
  }, [router]);

  return asyncRouter;
};
