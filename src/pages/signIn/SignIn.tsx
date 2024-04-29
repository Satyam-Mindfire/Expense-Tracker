import { Formik, Form } from "formik";
import { Input, Button } from "../../components";
import { Icons, Routes, Strings } from "../../constants";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { api, endPoints } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts";
import { showSuccessToast } from "../../utils";

interface ValueType {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(Strings.invalidEmail)
      .required(Strings.emailIsRequired),
    password: Yup.string()
      .min(8, Strings.passwordRules)
      .required(Strings.passwordIsRequired),
  });

  const mutation = useMutation({
    mutationFn: (userData: ValueType) => {
      return api.post(endPoints.auth.logIn, userData);
    },
    onSuccess: (response) => {
      login(response.data);
      const from = location.state?.from || "/";
      navigate(from);
      showSuccessToast({message: Strings.successSignInMsg})
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (values: ValueType) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.log(error)
    }
  };

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
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Input
                label={Strings.email}
                id="email"
                type="email"
                name="email"
                placeholder={Strings.emailPlaceholder}
              />
              <Input
                label={Strings.password}
                id="password"
                type="password"
                name="password"
                placeholder={Strings.passwordPlaceholder}
                containerClassName="mb-3"
              />
              <Button className="mt-5 w-full">{Strings.signIn}</Button>
            </Form>
          </Formik>

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
