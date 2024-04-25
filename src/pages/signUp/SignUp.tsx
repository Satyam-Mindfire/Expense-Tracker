import { Formik, Form } from "formik";
import { Input, Button } from "../../components";
import { Icons, Strings } from "../../constants";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {};

  const validationSchema = Yup.object().shape({
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
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Input
                label={Strings.name}
                id="name"
                type="text"
                name="name"
                placeholder={Strings.namePlaceholder}
              />
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
              />
              <Input
                label={Strings.confirmPassword}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder={Strings.passwordPlaceholder}
                containerClassName="mb-3"
              />
              <Button className="mt-5 w-full">{Strings.signUp}</Button>
            </Form>
          </Formik>

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
