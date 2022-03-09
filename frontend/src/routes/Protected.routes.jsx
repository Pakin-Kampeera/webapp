import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoutes = () => {
  const isAuth = useSelector((state) => state.auth.isLogin);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};
