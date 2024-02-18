import { useEffect } from "react";
import useAuth from "../../../hooks/use-auth";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, loadingAuth, refershAccessToken } = useAuth();
  
  useEffect(()=>{
    refershAccessToken();

  },[]);

  if(loadingAuth){
    return <></>;
  }
  else{
    if(isAuthenticated) return element;
    else return <Navigate to="/login" />;
  }
};

export default AuthRoute;