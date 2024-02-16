import React from "react";
import Col from "react-bootstrap/Col";
import styles from "./NoteBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPencil} from "@fortawesome/free-solid-svg-icons";

const NoteBox = ({title,desc}) => {
  return (
    <Col md={6} lg={4}>
      <div className={styles.note_box}>
        <h2>{title}</h2>
        <p>{desc}</p>
        <div className={`${styles.box_footer} d-flex justify-content-end`}>
          <FontAwesomeIcon title="update" className={styles.update_icon} icon={faPencil} />
          <FontAwesomeIcon  title="delete"  className={styles.delete_icon} icon={faTrashCan} />
        </div>
      </div>
    </Col>
  );
};

export default NoteBox;
