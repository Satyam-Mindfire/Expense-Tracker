import { Strings } from "../../constants";
import * as Yup from "yup";

// Validation schema for form inputs
export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().required(Strings.nameIsRequired),
  email: Yup.string()
    .email(Strings.invalidEmail)
    .required(Strings.emailIsRequired),
  password: Yup.string()
    .min(8, Strings.passwordRules)
    .required(Strings.passwordIsRequired),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], Strings.passwordMustMatch)
    .required(Strings.confirmPasswordIsRequired),
});
