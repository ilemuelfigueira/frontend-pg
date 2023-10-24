export { YupSchemasEnum } from "./enum";
import { obsidianValidationSchema } from "./obsidian";

import { YupSchemasEnum } from "./enum";

export const getYupSchema = (name) => {
  if (YupSchemasEnum.OBSIDIAN === name) {
    return obsidianValidationSchema;
  }
  if (YupSchemasEnum.SPEAKEASY === name) {
    return obsidianValidationSchema;
  }
  if (YupSchemasEnum.GRANDMASTER === name) {
    return obsidianValidationSchema;
  }

  return null
};
