import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./routes/Protected.routes";
import { SignIn } from "./views/SignIn";
import { SignUp } from "./views/SignUp";
import { Profile } from "./views/Profile";
import { useSelector } from "react-redux";

export const App = () => {
  const isAuth = useSelector((state) => state.auth.isLogin);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={isAuth ? <Profile /> : <SignIn />} />
      </Routes>
    </>
  );
};
