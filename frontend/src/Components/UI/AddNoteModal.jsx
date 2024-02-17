import React, { useState } from 'react';
import styles from "./AddNoteModal.module.css";
import Modal from 'react-bootstrap/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import FloatingResponse from './FloatingResponse';

const AddNoteModal = (props) => {

  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  return (
    <>
        <Modal
    {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className={styles.add_note_container}
  >
    <Modal.Header className={styles.add_note_header}>
      <Modal.Title className={styles.add_note_title} id="contained-modal-title-vcenter">
        <span>Create New Note</span>
        <FontAwesomeIcon onClick={props.onHide} className={styles.close_icon} icon={faX}/>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className={styles.add_note_body}>
        <NoteForm
           onHide={props.onHide}
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

  )
}

export default AddNoteModal
