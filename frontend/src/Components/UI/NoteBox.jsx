import React from "react";
import Col from "react-bootstrap/Col";
import styles from "./NoteBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCircle} from "@fortawesome/free-solid-svg-icons";

const NoteBox = ({title,desc,priority}) => {

let circleColor="low"

switch (priority) {
  case "low":
    circleColor=styles.low
    break;
  case "medium":
    circleColor=styles.medium
    break;
  case "high":
    circleColor=styles.high
    break;

  default:
    break;
}

  return (
    <Col md={6} lg={4}>
      <div className={styles.note_box}>
        <div className={styles.priority_container}>
        <FontAwesomeIcon icon={faCircle} className={circleColor}/>
        </div>
        <h2>{title}</h2>
        <p>{desc}</p>
        <div className={`${styles.box_footer} d-flex justify-content-between w-100 align-items-center px-2`}>
          <FontAwesomeIcon  title="delete"  className={styles.delete_icon} icon={faTrashCan} />
            <button className={styles.update_btn}>Update</button>
        </div>
      </div>
    </Col>
  );
};

export default NoteBox;
