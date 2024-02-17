import React, { useState } from "react";
import styles from "./Auth.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import login_img from "../../assets/login.png";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouchedFields({ ...touchedFields, [name]: true });

    if (name === "email") {
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
const navigate=useNavigate();

  const sendFormData = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post(`http://localhost:4444/login`, data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
    navigate("/")
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    sendFormData(formData);
  };

  const passwordMsgClass = passwordError
    ? styles.password_error_msg
    : styles.msg_error;
  const emailMsgClass = emailError ? styles.email_error_msg : styles.msg_error;
  const btnControl =
    (!touchedFields.name && !touchedFields.email && !touchedFields.password) ||
    passwordError ||
    emailError;

  return (
    <div
      className={`${styles.container_all} d-flex justify-content-center align-items-center`}
    >
      <Row className={styles.landing}>
        <Col sm={6} className={styles.left_container}>
          <div className={styles.img_container}>
            <img src={login_img} alt="login img" />
          </div>
        </Col>

        <Col
          sm={6}
          className={`${styles.right_container} d-flex justify-content-center align-items-center`}
        >
          <h2 className={styles.title}>Login</h2>
          <form onSubmit={handleSubmit} className={styles.form_container}>
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
            <div className="text-center mt-4">
              <button
                disabled={btnControl}
                type="submit"
                className={`${styles.submit_btn} ${
                  btnControl ? styles.submit_btn_diabled : ""
                }`}
              >
                {loading ? <FontAwesomeIcon icon={faSpinner} /> : 'Login'}
              </button>
            </div>
          </form>
          <span>don't have an account? <Link to={"/register"} className="main_color">sign up</Link></span>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
