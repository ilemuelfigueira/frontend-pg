import * as Yup from "yup";

/**
 *
 * @param {{
 * type: string,
 * name: string,
 * placeholder: string,
 * value: string,
 * validations: {type: string, message: string}[]
 * }} field
 */
export function generateValidationField(field) {
  let schema = Yup[field.type ? field.type : "string"]();

  for (const rule of field.validations) {
    switch (rule.type) {
      case "isTrue":
        schema = schema.isTrue(rule.message);
        break;
      case "isEmail":
        schema = schema.email(rule.message);
        break;
      case "minLength":
        schema = schema.min(rule.value, rule.message);
        break;
      case "maxLength":
        schema = schema.max(rule.value, rule.message);
        break;
      case "required":
        schema = schema.required(rule.message);
        break;
      default:
        schema = schema[rule.type](rule.message);
        break;
    }
  }

  return schema;
}

/**
 *
 * @param {{
 * type: string,
 * name: string,
 * placeholder: string,
 * value: string,
 * validations: {type: string, message: string}[]
 * }[]} fields
 */
export function initializeForm(fields) {
  let initialValues = {};
  let validationFields = {};

  for (const field of fields) {
    initialValues[field.name] = field.value;
    if (!field.validations) continue;

    validationFields[field.name] = generateValidationField(field);
  }

  return {
    validationSchema: Yup.object(validationFields),
    initialValues,
  };
}
