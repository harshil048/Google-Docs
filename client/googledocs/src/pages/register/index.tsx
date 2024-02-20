import { KeyboardEvent, useContext, useState } from "react";
import useWindowSize from "../../hooks/use-window-size";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import AuthService from "../../services/auth-service";
import { ToastContext } from "../../contexts/toast-context";
import axios, { AxiosError } from "axios";
import TextField from "../../components/atoms/text-field";
import Logo from "../../components/atoms/logo/logo";

const Register = () => {
  const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password1Errors, setPassword1Errors] = useState<Array<string>>([]);
  const [password2, setPassword2] = useState("");
  const [password2Errors, setPassword2Errors] = useState<Array<string>>([]);

  const navigate = useNavigate();
  const { addToast, error } = useContext(ToastContext);

  const validate = () => {
    setEmailErrors([]);
    setPassword1Errors([]);
    setPassword2Errors([]);

    let isValid = true;
    if (!validator.isEmail(email)) {
      setEmailErrors(["Must enter a valid email"]);
      isValid = false;
    }
    if (!(password1.length >= 8 && password1.length <= 25)) {
      setPassword1Errors((prev) => [
        ...prev,
        "Password must be between 8 and 25 characters",
      ]);
      isValid = false;
    }
    if (!/\d/.test(password1)) {
      setPassword1Errors((prev) => [...prev, "Password must contain a number"]);
      isValid = false;
    }
    if (password1 !== password2) {
      setPassword2Errors(["Passwords must match"]);
      isValid = false;
    }
    return isValid;
  };

  const register = async () => {
    if (!validate()) return;

    try {
      await AuthService.register({ email, password1, password2 });
      addToast({
        title: `${email} Registered successfully!`,
        body: "Please check your inbox to verify your email address.",
        color: "success",
      });
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError;
        const errors = (response as any).data.errors;
        const emailFieldErrors = errors
          .filter((error: any) => error.param === "email")
          .map((error: any) => error.msg);
        const password1FieldErrors = errors
          .filter((error: any) => error.param === "password1")
          .map((error: any) => error.msg);
        const password2FieldErrors = errors
          .filter((error: any) => error.param === "password2")
          .map((error: any) => error.msg);

        if (emailFieldErrors) setEmailErrors(emailFieldErrors);
        if (password1FieldErrors) setPassword1Errors(password1FieldErrors);
        if (password2FieldErrors) setPassword2Errors(password2FieldErrors);

        if (
          !emailFieldErrors &&
          !password1FieldErrors &&
          !password2FieldErrors
        ) {
          error("An unknown error has occured. Please try again");
        }
      } else {
        error("An unknown error has occured. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      register();
    }
  };

  const handleOnInputEmail = (value: string) => {
    setEmailErrors([]);
    setEmail(value);
  };

  const handleOnInputPassword1 = (value: string) => {
    setPassword1Errors([]);
    setPassword1(value);
  };

  const handleOnInputPassword2 = (value: string) => {
    setPassword2Errors([]);
    setPassword2(value);
  };

  return (
    <div
      onKeyPress={handleOnKeyPress}
      className="w-full flex flex-col sm:justify-centers items-center p-6 sm:pb-96 bg-gray-100 dark:bg-slate-900 text-primary"
      style={{ width: widthStr, height: heightStr }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 border-primary rounded shadow-md border dark:border-0 dark:shadow-xl p-6">
        <div className="flex flex-col space-y-4">
          <div className="w-full text-center flex flex-col justify-center items-center">
            <Logo />
            <h1 className="font-medium text-2xl ">Sign Up</h1>
            <p className="font-medium ">for a Docs account</p>
          </div>
          <TextField
            value={email}
            onInput={handleOnInputEmail}
            label="Email"
            color="secondary"
            errors={emailErrors}
          />
          <TextField
            value={password1}
            onInput={handleOnInputPassword1}
            label="Password"
            type="password"
            color="secondary"
            errors={password1Errors}
          />
          <TextField
            value={password2}
            onInput={handleOnInputPassword2}
            label="Confirm Password"
            type="password"
            color="secondary"
            errors={password2Errors}
          />
          <Link
            to="/login"
            className="text-sm hover:underline font-semibold text-blue-500 text-left"
          >
            Sign in instead
          </Link>
          <button
            onClick={register}
            disabled={loading}
            className="bg-blue-600 text-sm font-semibold text-white px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className={`${loading && "opacity-0"}`}>Register</span>
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

export default Register;
