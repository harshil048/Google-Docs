// import React from "react";

import { KeyboardEvent, useContext, useState } from "react";
import TextField from "../../components/atoms/text-field";
import useWindowSize from "../../hooks/use-window-size";
import validator from "validator";
import AuthService from "../../services/auth-service";
import useAuth from "../../hooks/use-auth";
import { ToastContext } from "../../contexts/toast-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState<Array<string>>([]);
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { success, error } = useContext(ToastContext);
  const navigate = useNavigate();

  const validate = () => {
    setEmailErrors([]);
    setPasswordErrors([]);

    let isValid = true;
    if (!validator.isEmail(email)) {
      setEmailErrors(["Must enter a valid errors"]);
      isValid = false;
    }
    if (!password.length) {
      setPasswordErrors(["Must enter a password"]);
      isValid = false;
    }
    return isValid;
  };

  const loginUser = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await AuthService.login({ email, password });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;
      login(newAccessToken, newRefreshToken);
      success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      error("Incorrect Username or Password");
    } finally {
      setLoading(false);
    }
  };

  const handleOnKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") loginUser();
  };

  const handleOnInputEmail = (value: string) => {
    setEmailErrors([]);
    setEmail(value);
  };
  const handleOnInputPassword = (value: string) => {
    setPasswordErrors([]);
    setPassword(value);
  };

  return (
    <div
      onKeyPress={handleOnKeyPress}
      className="w-full flex flex-col sm:justify-center items-center p-6 sm:pb-6 bg-gray-100 dark:bg-slate-900 text-primary"
      style={{ width: widthStr, height: heightStr }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded border-primary shadow-md brder dark:border-0 dark:shadow-xl p-6">
        <div className="flex flex-col space-y-4">
          <div className="w-full text-center flex flex-col justify-center items-center">
            <h1>Logo</h1>
            <h1 className="font-medium text-2xl">Sign In</h1>
            <p className="font-medium">to contiue to Docs</p>
          </div>
          <TextField
            value={email}
            onInput={handleOnInputEmail}
            label="Email"
            color="secondary"
            errors={emailErrors}
          />
          <p className="text-sm hover:underline font-semibold text-blue-500 text-left">
            Need an account?
          </p>
          <TextField
            value={password}
            onInput={handleOnInputPassword}
            label="Password"
            type="password"
            color="secondary"
            errors={passwordErrors}
          />
          <button
            tabIndex={-1}
            className="text-sm hover:underline font-semibold text-blue-500 text-left"
          >
            Forgot Password
          </button>
          <button
            onClick={loginUser}
            disabled={loading}
            className="bg-blue-600 text-sm font-semibold text-white px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className="">Login</span>
          </button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 text-sm p-4">
        <button className="hover:underline font-semibold text-blue-500 ">
          Terms
        </button>
        <button className="hover:underline font-semibold text-blue-500 ">
          Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default Login;
