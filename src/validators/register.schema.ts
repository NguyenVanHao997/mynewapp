import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Tên là bắt buộc").min(2, "Tên quá ngắn"),
  email: yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
export default registerSchema;
