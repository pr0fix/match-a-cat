import * as yup from "yup";
import { useAuthStore } from "../stores/authStore";
import type { SignUpCredentials } from "../utils/types";
import { Formik } from "formik";
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignUp = () => {
  const { signup } = useAuthStore();

  const handleSignUp = async (values: SignUpCredentials) => {
    const { name, username, password } = values;
    signup(name, username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ name: "", username: "", password: "" }}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <div>
              <input
                type="text"
                placeholder="Name"
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                className="my-2"
              />

              {/* <TextField
                fullWidth
                placeholder="Name"
                variant="outlined"
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                className="my-2"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#6F4E37",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                placeholder="Username"
                variant="outlined"
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                className="my-2"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#6F4E37",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                placeholder="Password"
                type="password"
                variant="outlined"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                className="my-2"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#6F4E37",
                    },
                  },
                }}
              />
              <Button
                fullWidth
                className="bg-primary-main text-white font-bold"
                onClick={() => handleSubmit()}
              >
                Sign Up
              </Button>
              <Link
                to="/login"
                className="font-bold text-primary-main no-underline text-center"
              >
                <Typography className="font-bold pt-5">
                  Already have an account? Sign in
                </Typography>
              </Link> */}
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
