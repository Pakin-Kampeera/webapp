import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/reducer/authReducer";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as AuthService from "../services/auth.service";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./Share.css";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (username, password) => {
    try {
      const data = await AuthService.default.login(username, password);
      dispatch(authAction.login({}));
      toast.success("Login success!");
      navigate("/profile");
    } catch (error) {
      toast.error(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          "Failed"
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      loginHandler(values.username, values.password);
    },
  });

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <h1 className="mb-0 me-3">Sign in</h1>
                </div>
                <div className="form-outline mb-2 mt-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Username
                  </label>
                  <input
                    type="text"
                    id="form3Example3"
                    className={`form-control form-control-lg ${
                      formik.touched.username && formik.errors.username
                    }`}
                    placeholder="Username"
                    {...formik.getFieldProps("username")}
                  />
                </div>
                {formik.touched.username && formik.errors.username && (
                  <div style={{ color: "red" }}>{formik.errors.username}</div>
                )}
                <div className="form-outline mb-2 mt-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form3Example4"
                    className={`form-control form-control-lg ${
                      formik.touched.password && formik.errors.password
                    }`}
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-check-label" htmlFor="form2Example3">
                    Don't have an account? <Link to={"/signup"}>Register</Link>
                  </label>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">@Pakin Kampeera</div>
        </div>
      </section>
    </>
  );
};
