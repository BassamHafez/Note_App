import React, { useState } from "react";
import styles from "./MyNotes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faClock } from "@fortawesome/free-regular-svg-icons";
import { faCheckDouble, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoteBox from "../../Components/UI/NoteBox";
import AddNoteModal from "../../Components/UI/AddNoteModal";

const MyNotes = () => {

  const [activeLink, setActiveLink] = useState("all");
  const [modalShow, setModalShow] =useState(false);

  const notes = [
    {
      key: "1",
      title: "Clean The Room",
      desc: "clean my room fast within day to prepare for school",
    },
    {
      key: "2",
      title: "Meeting With Ammar",
      desc: "discuss the school project with Ammar collecting informations ",
    },
    {
      key: "3",
      title: "Finish My Project",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
    },
    {
      key: "4",
      title: "Play Football",
      desc: "play football sunday at 11 pm with my friends in the street",
    },
  ];

  const handleItemClick = (type) => {
    setActiveLink(type);
  };

  return (
    <>
    <div className={styles.my_notes_container}>
      <Row>
        <Col sm={4} lg={3} xl={2}>
          <aside className={styles.side_bar}>
            <div className="text-center">
              <button onClick={() => setModalShow(true)} className={styles.add_btn}>Add Note +</button>
            </div>

            <ul>
              <li
                className={activeLink === "all" ? styles.active_link : ""}
                onClick={() => handleItemClick("all")}
              >
                <FontAwesomeIcon icon={faClipboard} /> All Notes
              </li>
              <li
                className={activeLink === "underway" ? styles.active_link : ""}
                onClick={() => handleItemClick("underway")}
              >
                <FontAwesomeIcon icon={faCirclePlus} /> Underway
              </li>
              <li
                className={activeLink === "postponed" ? styles.active_link : ""}
                onClick={() => handleItemClick("postponed")}
              >
                <FontAwesomeIcon icon={faClock} /> Postponed
              </li>
              <li
                className={activeLink === "finished" ? styles.active_link : ""}
                onClick={() => handleItemClick("finished")}
              >
                <FontAwesomeIcon icon={faCheckDouble} /> Finished
              </li>
            </ul>
            <button className={styles.log_out_btn}>Log Out</button>
          </aside>
        </Col>
        <Col sm={8} lg={9} xl={10}>
          <Row className={styles.note_container}>
            {notes.map((note) => (
              <NoteBox key={note.key} title={note.title} desc={note.desc} />
            ))}
          </Row>
        </Col>
      </Row>
    </div>
    <AddNoteModal
       show={modalShow}
       onHide={() => setModalShow(false)}
    />
    </>
  );
};

export default MyNotes;
