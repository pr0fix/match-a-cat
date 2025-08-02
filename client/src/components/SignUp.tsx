import * as yup from "yup";
import { useAuthStore } from "../stores/authStore";
import type { SignUpCredentials } from "../utils/types";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignUp = () => {
  const { signup } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async (values: SignUpCredentials) => {
    const { name, username, password } = values;
    signup(name, username, password, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <Formik
          validationSchema={validationSchema}
          initialValues={{ name: "", username: "", password: "" }}
          onSubmit={handleSignUp}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="flex flex-col bg-[var(--matcha-cream)] p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl">
              <h1 className="text-center mb-6 text-xl sm:text-2xl md:text-3xl font-bold">
                Create a Match-A-Cat account
              </h1>
              <input
                type="text"
                placeholder="Name"
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                className="p-2 sm:p-3 md:p-4 mb-1 outline text-sm md:text-base rounded w-full"
                onError={() => touched.name && Boolean(errors.name)}
              />
              {touched.name && errors.name && (
                <div className="text-red-500 text-[12px] md:text-sm">
                  {errors.name}
                </div>
              )}
              <input
                type="text"
                placeholder="Username"
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                className="p-2 sm:p-3 md:p-4 mt-3 mb-1 outline text-sm md:text-base rounded w-full"
                onError={() => touched.username && Boolean(errors.username)}
              />
              {touched.username && errors.username && (
                <div className="text-red-500 text-[12px] md:text-sm">
                  {errors.username}
                </div>
              )}
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                className="p-2 sm:p-3 md:p-4 mt-3 mb-1 outline text-sm md:text-base rounded w-full"
                onError={() => touched.password && Boolean(errors.password)}
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-[12px] md:text-sm">
                  {errors.password}
                </div>
              )}
              <button
                type="submit"
                className="w-full font-bold mt-8 border-2 p-2 sm:p-3 md:p-4 rounded text-base md:text-lg"
              >
                Sign Up
              </button>

              <Link
                to="/login"
                className="font-bold text-primary-main no-underline text-center"
              >
                <p className="font-bold pt-6 text-xs sm:text-sm md:text-base">
                  Already have an account? Sign in
                </p>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
