import React, { useContext, useState } from "react";
import styles from "./AddNoteModal.module.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FloatingResponse from "./FloatingResponse";
import { myContext } from "../../Context/MyContext";

const ConfirmModal = ({ show, onHide, msg, type, id }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userID");
  const {toggleDataChanged}=useContext(myContext);

  const logoutHandler = async () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const deleteNote = async () => {
    if (userId) {
      try {
        console.log(id)
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_API}notes/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              userId: userId,
            },
          }
        );
        console.log(response);
        setResponseMessage({
          title: "Deleted Successfully",
          content: "Your Note has been Deleted Successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        toggleDataChanged()
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
