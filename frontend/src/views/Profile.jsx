import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as ProfileService from "../services/profile.service";
import * as AuthService from "../services/auth.service";
import * as Yup from "yup";
import "./Share.css";

export const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [oldUsername, setOldUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [oldFirstName, setOldFirstName] = useState("");
  const [oldLastName, setOldLastName] = useState("");
  const [image, setImage] = useState();

  const [edit, setEdit] = useState(false);
  const [fileName, setFileName] = useState();
  const [selectFile, setSelectFile] = useState();
  const [refreshPage, setRefreshPage] = useState(false);
  const isActive = edit ? "active" : "";
  const isDisable = edit ? "" : "disabled";
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    event.preventDefault();
    AuthService.default.logout();
    navigate("/");
  };

  const saveChangeHandler = async (
    username,
    password,
    firstName,
    lastName,
    image
  ) => {
    try {
      const { data } = await ProfileService.default.updateProfile(
        username,
        password,
        firstName,
        lastName,
        image
      );
      toast.success(data.message);
      setRefreshPage(true);
      setEdit(false);
      setUsername("");
      setPassword("**************");
      setFirstName("");
      setLastName("");
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
      saveChangeHandler(
        values.username,
        values.password,
        values.firstName,
        values.lastName,
        selectFile
      );
    },
  });

  const editProfileHandler = (event) => {
    event.preventDefault();
    setEdit(!edit);
  };

  const onUploadImage = (event) => {
    event.preventDefault();
    setFileName(event.target.files[0].name);
    setSelectFile(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ProfileService.default.getProfile();
        setOldUsername(data.data.username);
        setOldPassword("**************");
        setOldFirstName(data.data.firstName);
        setOldLastName(data.data.lastName);
        setImage(
          btoa(String.fromCharCode(...new Uint8Array(data.data.image.data)))
        );
        setRefreshPage(false);
      } catch (error) {
        toast.error(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            "Failed"
        );
      }
    };
    fetchData();
  }, [refreshPage]);

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={"/profile"}>
            <div className="navbar-brand">My Profile</div>
          </Link>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <form className="form-inline my-2 my-lg-0">
              <button
                className="btn btn-danger my-2 my-sm-0"
                type="button"
                onClick={logoutHandler}
              >
                Sign out
              </button>
            </form>
          </div>
        </nav>
        <div className="container py-5 mt-5">
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src={`data:image/*;base64,${image}`}
                      alt="avatar"
                      className="img-fluid"
                      style={{ width: "150px" }}
                    />
                    <h5 className="my-3">
                      {oldFirstName} {oldLastName}
                    </h5>
                    <div className="d-flex justify-content-center mb-2">
                      <button
                        type="button"
                        className={`btn btn-primary ${isActive}`}
                        onClick={editProfileHandler}
                      >
                        Edit
                      </button>
                      <button
                        type="submit"
                        className={`btn btn-outline-primary ms-1 ${isDisable}`}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Username</p>
                      </div>
                      <div className="col-sm-9">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className={`form-control form-control-md ${
                                formik.touched.username &&
                                formik.errors.username
                              }`}
                              placeholder={oldUsername}
                              onKeyPress={(event) =>
                                setUsername(event.target.value)
                              }
                              {...formik.getFieldProps("username")}
                            />
                            {formik.touched.username &&
                              formik.errors.username && (
                                <div style={{ color: "red" }}>
                                  {formik.errors.username}
                                </div>
                              )}
                          </>
                        ) : (
                          <p className="text-muted mb-0">
                            {edit ? username : oldUsername}
                          </p>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Password</p>
                      </div>
                      <div className="col-sm-9">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className={`form-control form-control-md ${
                                formik.touched.password &&
                                formik.errors.password
                              }`}
                              placeholder={oldPassword}
                              onKeyPress={(event) =>
                                setPassword(event.target.value)
                              }
                              {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password &&
                              formik.errors.password && (
                                <div style={{ color: "red" }}>
                                  {formik.errors.password}
                                </div>
                              )}
                          </>
                        ) : (
                          <p className="text-muted mb-0">
                            {edit ? password : oldPassword}
                          </p>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">First name</p>
                      </div>
                      <div className="col-sm-9">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className={`form-control form-control-md ${
                                formik.touched.firstName &&
                                formik.errors.firstName
                              }`}
                              placeholder={oldFirstName}
                              onKeyPress={(event) =>
                                setFirstName(event.target.value)
                              }
                              {...formik.getFieldProps("firstName")}
                            />
                            {formik.touched.firstName &&
                              formik.errors.firstName && (
                                <div style={{ color: "red" }}>
                                  {formik.errors.firstName}
                                </div>
                              )}
                          </>
                        ) : (
                          <p className="text-muted mb-0">
                            {edit ? firstName : oldFirstName}
                          </p>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Last name</p>
                      </div>
                      <div className="col-sm-9">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className={`form-control form-control-md ${
                                formik.touched.lastName &&
                                formik.errors.lastName
                              }`}
                              placeholder={oldLastName}
                              onKeyPress={(event) =>
                                setLastName(event.target.value)
                              }
                              {...formik.getFieldProps("lastName")}
                            />
                            {formik.touched.lastName &&
                              formik.errors.lastName && (
                                <div style={{ color: "red" }}>
                                  {formik.errors.lastName}
                                </div>
                              )}
                          </>
                        ) : (
                          <p className="text-muted mb-0">
                            {edit ? lastName : oldLastName}
                          </p>
                        )}
                      </div>
                    </div>
                    {edit ? (
                      <>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Upload image</p>
                          </div>
                          <div className="col-sm-9">
                            <div className="form-outline">
                              <div className="input-group">
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
                                <div style={{ color: "red" }}>
                                  {formik.errors.image}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
