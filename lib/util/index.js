export { aplicarMascara } from "./mascara";

export function objectToQueryString(values) {
  const keys = Object.keys(values);
  let queryString = "";

  keys.forEach((key) => {
    queryString += `${key}=${values[key]}&`;
  });

  return queryString;
}
