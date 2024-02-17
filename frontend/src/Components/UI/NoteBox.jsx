import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import styles from "./NoteBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import UpdateNoteModal from "./UpdateNoteModal";

const NoteBox = ({ title, desc, priority,id }) => {
  const [modalShow, setModalShow] = useState(false);

  let circleColor = "low";

  switch (priority) {
    case "low":
      circleColor = styles.low;
      break;
    case "medium":
      circleColor = styles.medium;
      break;
    case "high":
      circleColor = styles.high;
      break;

    default:
      break;
  }

  return (
    <>
      <Col lg={6} xl={4}>
        <div className={styles.note_box}>
          <div className={styles.priority_container}>
            <FontAwesomeIcon icon={faCircle} className={circleColor} />
          </div>
          <h2>{title}</h2>
          <p>{desc}</p>
          <div
            className={`${styles.box_footer} d-flex justify-content-between w-100 align-items-center px-2`}
          >
            <FontAwesomeIcon
              title="delete"
              className={styles.delete_icon}
              icon={faTrashCan}
            />
            <button
              onClick={() => setModalShow(true)}
              className={styles.update_btn}
            >
              Update
            </button>
          </div>
        </div>
      </Col>
      <UpdateNoteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={title}
        desc={desc}
        priority={priority}
        id={id}
      />
    </>
  );
};

export default NoteBox;
