import * as yup from "yup";
import { useAuthStore } from "../stores/authStore";
import type { LoginCredentials } from "../utils/types";
import { Formik } from "formik";
import { Link } from "react-router";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { login } = useAuthStore();

  const handleLogin = async (values: LoginCredentials) => {
    const { username, password } = values;
    login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <Formik
          validationSchema={validationSchema}
          initialValues={{ username: "", password: "" }}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <div className="flex flex-col bg-amber-50 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
              <h1 className="text-center mb-6 text-xl sm:text-2xl md:text-3xl font-bold">
                Login to Catter
              </h1>
              <input
                type="text"
                placeholder="Username"
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                className="p-2 sm:p-3 md:p-4 mb-1 outline text-sm md:text-base rounded w-full"
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
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-[12px] md:text-sm">
                  {errors.password}
                </div>
              )}
              <button
                type="submit"
                className="w-full font-bold mt-8 border-2 p-2 sm:p-3 md:p-4 rounded text-base md:text-lg hover:bg-amber-100 transition-colors"
                onClick={() => handleSubmit()}
              >
                Login
              </button>

              <Link
                to="/signup"
                className="font-bold text-primary-main no-underline text-center"
              >
                <p className="font-bold pt-6 text-xs sm:text-sm md:text-base">
                  Don't have an account? Sign up
                </p>
              </Link>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
