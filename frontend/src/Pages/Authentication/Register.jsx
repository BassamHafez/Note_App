import React, { useState } from "react";
import styles from "./Auth.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import register_img from "../../assets/register.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouchedFields({ ...touchedFields, [name]: true });

    if (name === "name") {
      setNameError(value.trim().length < 3);
    } else if (name === "email") {
      setEmailError(!validateEmail(value));
    } else if (name === "password") {
      setPasswordError(!validatePassword(value));
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendFormData = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:4444/signup`, data);
      console.log(response);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim().length < 3) {
      setNameError(true);
      return;
    }

    if (!validatePassword(formData.password)) {
      setPasswordError(true);
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setPasswordError(false);
    setNameError(false);
    sendFormData(formData);
  };

  const passwordMsgClass = passwordError
    ? styles.password_error_msg
    : styles.msg_error;
  const emailMsgClass = emailError ? styles.email_error_msg : styles.msg_error;
  const nameMsgClass = nameError ? styles.name_error_msg : styles.msg_error;
  const btnControl =
    (!touchedFields.name && !touchedFields.email && !touchedFields.password) ||
    passwordError ||
    emailError ||
    nameError;

  return (
    <div
      className={`${styles.container_all} d-flex justify-content-center align-items-center`}
    >
      <Row className={styles.landing}>
        <Col sm={6} className={styles.left_container}>
          <div className={styles.img_container_register}>
            <img src={register_img} className="w-100" alt="register img" />
          </div>
        </Col>

        <Col
          sm={6}
          className={`${styles.right_container} d-flex justify-content-center align-items-center`}
        >
          <h2 className={styles.title}>Register</h2>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            <div className={styles.input_field}>
              <label htmlFor="userName">Name</label>
              <input
                type="text"
                name="name"
                id="userName"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className={nameMsgClass}>
                name should be at least 3 letters
              </span>
            </div>
            <div className={styles.input_field}>
              <label htmlFor="userEmail">Email</label>
              <input
                type="email"
                name="email"
                id="userEmail"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className={emailMsgClass}>invalid email</span>
            </div>
            <div className={styles.input_field}>
              <label htmlFor="userPassword">Password</label>
              <input
                type="password"
                name="password"
                id="userPassword"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className={passwordMsgClass}>
                Password should contain at least one capital letter and one
                number
              </span>
            </div>
            <div className="w-100 text-end my-1">
              <span className={styles.caption}>
                Already have an account?{" "}
                <Link to={"/login"} className="main_color">
                  sign in
                </Link>
              </span>
            </div>
            <div className="text-center mt-4">
              <button
                disabled={btnControl}
                type="submit"
                className={`${styles.submit_btn} ${
                  btnControl ? styles.submit_btn_diabled : ""
                }`}
              >
                {loading ? <FontAwesomeIcon icon={faSpinner} /> : "Register"}
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
