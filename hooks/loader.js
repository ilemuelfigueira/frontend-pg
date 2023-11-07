import { fetcher } from "@/lib/util/fetcher";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export function down(url, options) {
  return useSWRImmutable(url, fetcher, options);
}

export function whopper(url, options) {
  return useSWR(url, fetcher, options);
}
