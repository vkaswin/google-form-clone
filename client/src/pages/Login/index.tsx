import { Fragment } from "react";
import Input from "components/Input";
import useForm from "hooks/useForm";
import useAuth from "hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "services/User";
import { User } from "types/Auth";
import jwtDecode from "jwt-decode";

import { cookies } from "helpers";

import styles from "./Login.module.scss";

const Login = () => {
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const cookie = cookies();

  const searchParams = new URLSearchParams(location.search);

  const { register, handleSubmit, formErrors } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let {
        data: { token },
      } = await loginUser(data);
      cookie.set({ name: "auth_token", value: token, days: 14 });
      let redirectUrl = searchParams.get("url");
      let decoded = jwtDecode<User>(token);
      setUser(decoded);
      navigate(redirectUrl || "/form/list");
    } catch (error: any) {
      if (error?.message === "User not exist") navigate("/auth/register");
    }
  };

  return (
    <Fragment>
      <div className={styles.header}>
        <span>Sign In</span>
      </div>
      <div className={styles.container}>
        <div>
          <div className={styles.field}>
            <label>Email Id</label>
            <Input
              placeholder="Enter email id"
              register={register("email", {
                required: {
                  value: true,
                  message: "Please enter email id",
                },
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid Email",
                },
              })}
            />
          </div>
          {formErrors?.email && (
            <span className={styles.error_msg}>{formErrors.email}</span>
          )}
        </div>
        <div>
          <div className={styles.field}>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter password"
              register={register("password", {
                required: { value: true, message: "Please enter password" },
              })}
            />
          </div>
          {formErrors?.password && (
            <span className={styles.error_msg}>{formErrors.password}</span>
          )}
        </div>
        <div className={styles.cta}>
          <button onClick={handleSubmit(onSubmit)}>Login</button>
          <span>
            Dont't have an account ? &nbsp;
            <span onClick={() => navigate("/auth/register")}>Sign Up Here</span>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
