import * as yup from "yup";
import { useAuthStore } from "../stores/authStore";
import type { LoginCredentials } from "../utils/types";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = (): React.ReactElement => {
  const { login, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginCredentials) => {
    const { username, password } = values;
    login(username, password, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background-50)]">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <Formik
          validationSchema={validationSchema}
          initialValues={{ username: "", password: "" }}
          onSubmit={handleLogin}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="flex flex-col bg-[var(--background-200)] p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl">
              <h1 className="text-center mb-6 text-xl sm:text-2xl md:text-3xl font-bold">
                Login to Match-A-Cat
              </h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                className="p-2 sm:p-3 md:p-4 mt-3 mb-1 outline text-sm md:text-base rounded w-full placeholder:text-[var(--text-950)] focus:outline-[var(--accent-600)]"
              />
              {touched.username && errors.username && (
                <div className="text-[var(--error-500)] sm:text-[14px] md:text-[16px]">
                  {errors.username}
                </div>
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                className="p-2 sm:p-3 md:p-4 mt-3 mb-1 outline text-sm md:text-base rounded w-full placeholder:text-[var(--text-950)] focus:outline-[var(--accent-600)]"
              />
              {touched.password && errors.password && (
                <div className="text-[var(--error-500)] sm:text-[14px] md:text-[16px]">
                  {errors.password}
                </div>
              )}
              {error && (
                <div className="text-[var(--error-500)] mb-2">{error}</div>
              )}
              <button
                type="submit"
                className="form-btn w-full font-bold mt-8 border-2 p-2 sm:p-3 md:p-4 rounded text-base md:text-lg flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading && (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-2 animate-spin text-gray-500 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
                Login
              </button>

              <Link
                to="/sign-up"
                className="font-bold mt-6 no-underline text-center"
              >
                <p className="font-bold text-sm sm:text-md md:text-base">
                  Don't have an account? Sign up
                </p>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
