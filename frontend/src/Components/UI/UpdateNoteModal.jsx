import React, { useState } from "react";
import styles from "./AddNoteModal.module.css";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import UpdateNoteForm from "../NoteForm/UpdateNoteForm";
import FloatingResponse from "./FloatingResponse";

const UpdateNoteModal = ({ show, onHide, title, desc, priority, id }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
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
        <Modal.Header className={styles.add_note_header}>
          <Modal.Title
            className={styles.add_note_title}
            id="contained-modal-title-vcenter"
          >
            <span>Create New Note</span>
            <FontAwesomeIcon
              onClick={onHide}
              className={styles.close_icon}
              icon={faX}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.add_note_body}>
          <UpdateNoteForm
            currenTitle={title}
            currentDesc={desc}
            level={priority}
            id={id}
            onHide={onHide}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
            setShowResponse={setShowResponse}
          />
        </Modal.Body>
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

export default UpdateNoteModal;
