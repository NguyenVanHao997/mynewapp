import * as yup from "yup";

const searchSchema = yup.object({
  keyword: yup.string().required("Thiếu keyword"),
  page: yup
    .number()
    .transform((value, originalValue) => Number(originalValue))
    .min(1)
    .default(1),
  limit: yup
    .number()
    .transform((value, originalValue) => Number(originalValue))
    .min(1)
    .max(100)
    .default(10),
});
export default searchSchema;
