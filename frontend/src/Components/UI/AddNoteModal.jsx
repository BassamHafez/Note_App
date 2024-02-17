import React from 'react';
import styles from "./AddNoteModal.module.css";
import Modal from 'react-bootstrap/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const AddNoteModal = (props) => {
  return (
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
        <NoteForm/>
    </Modal.Body>
  </Modal>
  )
}

export default AddNoteModal
