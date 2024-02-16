import React from 'react';
import styles from "./AddNoteModal.module.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NoteForm from '../NoteForm/NoteForm';

const AddNoteModal = (props) => {
  return (
    <Modal
    {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className={styles.add_note_container}
  >
    <Modal.Header closeButton className={styles.add_note_header}>
      <Modal.Title className={styles.add_note_title} id="contained-modal-title-vcenter">
        Add Note
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className={styles.add_note_body}>
        <NoteForm/>
    </Modal.Body>
  </Modal>
  )
}

export default AddNoteModal
