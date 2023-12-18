import { fetcher } from "@/lib/util/fetcher";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export function down(path, options) {
  return useSWRImmutable(path, fetcher, options);
}

export function whopper(url, options) {
  return useSWR(url, fetcher, options);
}
