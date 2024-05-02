import { Strings } from "../../constants";
import * as Yup from "yup";

// Validation schema for form inputs
export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(Strings.invalidEmail)
    .required(Strings.emailIsRequired),
  password: Yup.string()
    .min(8, Strings.passwordRules)
    .required(Strings.passwordIsRequired),
});
