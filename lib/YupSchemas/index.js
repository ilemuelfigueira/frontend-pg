export { YupSchemasEnum } from "./enum";
import { obsidianValidationSchema } from "./obsidian";
import { speakeasyValidationSchema } from "./speakeasy";
import { grandmasterValidationSchema } from "./grandmaster";

import { YupSchemasEnum } from "./enum";

export const getYupSchema = (name) => {
  if (YupSchemasEnum.OBSIDIAN === name) {
    return obsidianValidationSchema;
  }
  if (YupSchemasEnum.SPEAKEASY === name) {
    return speakeasyValidationSchema;
  }
  if (YupSchemasEnum.GRANDMASTER === name) {
    return grandmasterValidationSchema;
  }

  return null
};
