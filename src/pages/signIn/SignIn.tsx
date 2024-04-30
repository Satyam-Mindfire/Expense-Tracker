import { Formik, Form } from "formik";
import { Input, Button } from "../../components";
import { Icons, Routes, Strings } from "../../constants";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts";
import { showSuccessToast } from "../../utils";
import { LoginValueType } from "../../types/user";
import { AxiosResponse } from "axios";
import { useSignInMutation } from "../../queries";

/**
 * SignIn Component
 * 
 * Renders the sign-in form for users to log in.
 * Allows users to input their email and password.
 * Validates form inputs using Yup schema.
 * Submits form data to the server for authentication.
 */
const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  // Validation schema for form inputs
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(Strings.invalidEmail)
      .required(Strings.emailIsRequired),
    password: Yup.string()
      .min(8, Strings.passwordRules)
      .required(Strings.passwordIsRequired),
  });

  /**
   * Handle successful login response
   * @param response The AxiosResponse object containing login data
   */
  const handleLoginSuccess = (response: AxiosResponse<any, any>) => {
    login(response.data);
    const from = location.state?.from || "/";
    navigate(from);
    showSuccessToast({ message: Strings.successSignInMsg });
  };

  // Mutation hook for signing in
  const { mutateAsync } = useSignInMutation({
    onSuccess: handleLoginSuccess,
    onError: (error) => console.log(error),
  });

  /**
   * Handle form submission
   * @param values The form values containing email and password
   */
  const handleSubmit = async (values: LoginValueType) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Navigate to the sign-up page
   */
  const navigateToSignUpPage = () => {
    navigate(Routes.signUp);
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col flex-1 m-20 justify-center">
          <label className="stroke-black drop-shadow-2xl font-bold text-3xl text-light-primaryText">
            {Strings.welcomeBack}
          </label>
          <label className="py-4 text-light-secondaryText ">
            {Strings.secondaryText}
          </label>
          {/* Formik form for handling form inputs */}
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              {/* Email input */}
              <Input
                label={Strings.email}
                id="email"
                type="email"
                name="email"
                placeholder={Strings.emailPlaceholder}
              />
              {/* Password input */}
              <Input
                label={Strings.password}
                id="password"
                type="password"
                name="password"
                placeholder={Strings.passwordPlaceholder}
                containerClassName="mb-3"
              />
              {/* Submit button */}
              <Button className="mt-5 w-full">{Strings.signIn}</Button>
            </Form>
          </Formik>

          {/* Sign-up link */}
          <div className="text-center mt-6">
            <label className="mr-1 text-light-primaryText">
              {Strings.signUpLinkText}
            </label>
            <button
              className="self-end mr-2 text-light-linkButton"
              onClick={navigateToSignUpPage}
            >
              {Strings.signUp}
            </button>
          </div>
        </div>
        <div className="flex-1 sm:block hidden">
          {/* Image */}
          <img
            src={Icons.signIn}
            className="rounded-2xl h-fit h-screen object-cover w-full"
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
