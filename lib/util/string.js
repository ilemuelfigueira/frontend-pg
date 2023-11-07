const dentroDeAsterisco = /\*(.*?)\*/;

export const serializeBreakLine = (text) => text.replace("\\n", "\n");
export const serializeLabel = (text) =>
  text.includes("*") ? text.replace(dentroDeAsterisco, "").trim() : text;
export const serializeStrongLabel = (text) =>
  text.includes("*") ? dentroDeAsterisco.exec(text)[1] : "";
