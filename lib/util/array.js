export const getFirstItem = (array = []) => {
  if (!array.length) return null;
  return array[0];
}