import React, { useContext, useState } from "react";
import styles from "./AddNoteModal.module.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../Context/MyContext";
import FloatingResponse from "./FloatingResponse";

const ConfirmModal = ({ show, onHide, msg, type, id }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const navigate = useNavigate();
  let { setIsLoginHandler } = useContext(myContext);

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`http://localhost:4444/logout`);
      console.log(response);
      setIsLoginHandler(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async () => {
    try {
      const response = await axios.delete(`http://localhost:4444/notes/:${id}`);
      console.log(response);
      setResponseMessage({
        title: "Deleted Successfully",
        content: "Your Note has been Deleted Successfully",
      });
      setSuccessResponse(true);
      setShowResponse(true);
      onHide();
    } catch (error) {
      setResponseMessage({
        title: "Delete Note Faild",
        content: "Your Note faild to be Deleted please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
      onHide(); 
    }
  };

  const deleteBtnClass = type === "delete" ? styles.delete_btn : "";

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.add_note_container}
      >
        <Modal.Body
          className={`${styles.add_note_body} ${styles.confirm_body}`}
        >
          <h6 className={styles.msg}>{msg}</h6>
        </Modal.Body>
        <Modal.Footer className={styles.modal_footer}>
          <div className="d-flex justify-content-evenly w-100 align-items-center">
            <button onClick={onHide} className={styles.cancel_btn}>
              No
            </button>
            <button
              onClick={type === "delete" ? deleteNote : logoutHandler}
              className={`${styles.confirm_btn} ${deleteBtnClass}`}
            >
              Yes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <FloatingResponse
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default ConfirmModal;
