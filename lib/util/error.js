export function onError(error = "", message = "") {
  console.error(error);

  throw new Error(message || error);
}
