import { Navigate, useParams } from "react-router-dom";
import { ToastContext } from "../../contexts/toast-context";
import { useContext, useEffect, useState } from "react";
import AuthService from "../../services/auth-service";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const { addToast, error } = useContext(ToastContext);
  const [children, setChildren] = useState(<>Loading...</>);

  const verifyEmail = async () => {
    if (token === undefined) {
      error("Invalid token");
      setChildren(<Navigate to="/login" />);
      return;
    }

    try {
      await AuthService.verifyEmail(token);
      addToast({
        title: "Email verified successfully!",
        body: "You can login now",
        color: "success",
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error("An unknown error occurred while verifying your email");
      } else {
        error("An unknown error occurred while verifying your email");
      }
    } finally {
      setChildren(<Navigate to="/login" />);
      return;
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return children;
};
export default VerifyEmail;
