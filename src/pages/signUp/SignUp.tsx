import { Formik, Form } from "formik";
import { Input, Button } from "../../components";
import { Icons, Routes, Strings } from "../../constants";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts";
import { showSuccessToast, signUpValidationSchema } from "../../utils";
import { SignUpRequest } from "../../types/user";
import { AxiosResponse } from "axios";
import { useSignUpMutation } from "../../queries";

/**
 * SignUp Component
 *
 * Renders the sign-up form for new users to register.
 * Allows users to input their name, email, password, and confirm password.
 * Validates form inputs using Yup schema.
 * Submits form data to the server for registration.
 */
const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const location = useLocation();

  /**
   * Handle successful sign-up response
   * @param response The AxiosResponse object containing sign-up data
   */
  const handleSignUpSuccess = (response: AxiosResponse<any, any>) => {
    login(response.data);
    const from = location.state?.from || Routes.home;
    navigate(from);
    showSuccessToast({ message: Strings.successSignUpMsg });
  };

  // Mutation hook for signing up
  const { mutateAsync } = useSignUpMutation({
    onSuccess: handleSignUpSuccess,
    onError: (error) => console.log(error),
  });

  /**
   * Handle form submission
   * @param values The form values containing name, email, password, and confirm password
   */
  const handleSubmit = async (values: SignUpRequest) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Navigate back to the previous page
   */
  const goBack = () => {
    navigate(-1); // Navigate back one step
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col flex-1 m-20 justify-center">
          <label className="stroke-black drop-shadow-2xl font-bold text-3xl text-light-primaryText">
            {Strings.welcomeText}
          </label>
          <label className="py-4 text-light-secondaryText ">
            {Strings.secondaryText}
          </label>
          {/* Formik form for handling form inputs */}
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={signUpValidationSchema}
          >
            <Form>
              {/* Name input */}
              <Input
                label={Strings.name}
                id="name"
                type="text"
                name="name"
                placeholder={Strings.namePlaceholder}
              />
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
              />
              {/* Confirm password input */}
              <Input
                label={Strings.confirmPassword}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder={Strings.passwordPlaceholder}
                containerClassName="mb-3"
              />
              {/* Submit button */}
              <Button className="mt-5 w-full">{Strings.signUp}</Button>
            </Form>
          </Formik>

          {/* Sign-in link */}
          <div className="text-center mt-6">
            <label className="mr-1 text-light-primaryText">
              {Strings.signInLinkText}
            </label>
            <button
              className="self-end mr-2 text-light-linkButton"
              onClick={goBack}
            >
              {Strings.signIn}
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

export default SignUp;
