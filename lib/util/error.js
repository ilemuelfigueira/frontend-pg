export function onError(error = "", message = "") {
  const errorString = typeof error === "string" ? error : JSON.stringify(error);

  console.error(errorString);

  throw new Error(message || errorString);
}
