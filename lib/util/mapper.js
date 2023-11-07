export function objectMapper(obj, structure) {
  if (!obj || !structure)
    throw new Error("Os campos obj e structure são obrigatórios");

  let newobj = {};

  for (const key of Object.keys(structure)) {
    const targetKey = structure[key];

    newobj[key] = obj[targetKey];
  }

  return newobj;
}

export function arrayMapper(arr, structure) {
  if (!structure) return arr;
  return arr.map((item) => objectMapper(item, structure));
}
