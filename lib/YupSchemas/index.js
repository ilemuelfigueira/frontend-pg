export { YupSchemasEnum } from "./enum";
import { obsidianValidationSchema } from "./obsidian";
import { speakeasyValidationSchema } from "./speakeasy";
import { grandmasterValidationSchema } from "./grandmaster";

import { YupSchemasEnum } from "./enum";
import { criarPedidoValidationSchema } from "./criarpedido";

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
  if (YupSchemasEnum.GOLIATH === name) {
    return grandmasterValidationSchema;
  }
  if (YupSchemasEnum.CRIARPEDIDO === name) {
    return criarPedidoValidationSchema
  }

  return null
};
