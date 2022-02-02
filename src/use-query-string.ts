import { stringify } from "query-string";
import { useEffect, useRef, useState } from "react";

type QsPrimitives = string | boolean | number | undefined | null;

type ConvertToQsSupport<T> = {
  [K in keyof T]: T[K] extends QsPrimitives ? T[K] : T[K] extends Array<any> ? Array<QsPrimitives> : T[K] extends Date ? string : T[K];
};

const getQs = <T>(url: string): ConvertToQsSupport<T> => {
  const qs = {} as ConvertToQsSupport<T>;
  if (url === "") return qs;
  const newURL = new URL(url, "http://localhost");
  if (url.includes("?")) {
    newURL.search = url.split("?").pop()!;
  }
  newURL.searchParams.forEach((value, key) => {
    (qs as any)[key] = parseValue(value);
  });
  return qs;
};

export const QS = { stringify, parse: getQs };

const isClientSide: boolean = !!(typeof window !== "undefined" && window.document);

const parseValue = (val: any) => {
  try {
    return JSON.parse(val);
  } catch (error) {
    return val;
  }
};

export const useQueryString = <T extends object>(): ConvertToQsSupport<T> => {
  const [queryString, setQueryString] = useState<ConvertToQsSupport<T>>(() => getQs(isClientSide ? window.location.href : ""));
  const url = useRef(isClientSide ? window.location.href : "");

  useEffect(() => {
    if (url.current === window.location.href) {
      return;
    }
    url.current = window.location.href;
    setQueryString(() => getQs(window.location.href));
  });

  return queryString;
};
