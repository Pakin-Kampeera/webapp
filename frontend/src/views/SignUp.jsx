import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import * as AuthService from "../services/auth.service";
import "./Share.css";

export const SignUp = () => {
  const [selectFile, setSelectFile] = useState();
  const [fileName, setFileName] = useState();
  const navigate = useNavigate();

  const registerHandler = async (
    username,
    password,
    firstName,
    lastName,
    image
  ) => {
    try {
      const { data } = await AuthService.default.register(
        username,
        password,
        firstName,
        lastName,
        image
      );
      toast.success(data.message);
      navigate("/");
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
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(12, "Must be 12 characters or less")
        .required("Username required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Password required"),
      firstName: Yup.string().required("First name required"),
      lastName: Yup.string().required("Last name required"),
    }),
    onSubmit: (values) => {
      registerHandler(
        values.username,
        values.password,
        values.firstName,
        values.lastName,
        selectFile
      );
    },
  });

  const onUploadImage = (event) => {
    event.preventDefault();
    setFileName(event.target.files[0].name);
    setSelectFile(event.target.files[0]);
  };

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
                  <h1 className="mb-0 me-3">Register</h1>
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
                <div className="form-outline mb-2 mt-4">
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
                <div className="form-outline mb-2 mt-4">
                  <label className="form-label" htmlFor="form3Example3">
                    First name
                  </label>
                  <input
                    type="text"
                    id="form3Example3"
                    className={`form-control form-control-lg ${
                      formik.touched.firstName && formik.errors.firstName
                    }`}
                    placeholder="First name"
                    {...formik.getFieldProps("firstName")}
                  />
                </div>
                {formik.touched.firstName && formik.errors.firstName && (
                  <div style={{ color: "red" }}>{formik.errors.firstName}</div>
                )}
                <div className="form-outline mb-2 mt-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="form3Example3"
                    className={`form-control form-control-lg ${
                      formik.touched.lastName && formik.errors.lastName
                    }`}
                    placeholder="Last name"
                    {...formik.getFieldProps("lastName")}
                  />
                </div>
                {formik.touched.lastName && formik.errors.lastName && (
                  <div style={{ color: "red" }}>{formik.errors.lastName}</div>
                )}
                <div className="form-outline mb-3 mt-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Upload image
                  </label>
                  <div className="input-group mb-2">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        onChange={onUploadImage}
                        accept="image/*"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        {fileName ? fileName : "Choose file"}
                      </label>
                    </div>
                  </div>
                  {formik.touched.image && formik.errors.image && (
                    <div style={{ color: "red" }}>{formik.errors.image}</div>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-check-label" htmlFor="form2Example3">
                    Already have account? <Link to={"/"}>Sign in</Link>
                  </label>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Sign up
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
