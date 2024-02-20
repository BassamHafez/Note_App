import React, { useContext, useEffect, useState } from "react";
import styles from "./MyNotes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckDouble,
  faCircle,
  faCirclePlus,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoteBox from "../../Components/UI/NoteBox";
import AddNoteModal from "../../Components/UI/AddNoteModal";
import ConfirmModal from "../../Components/UI/ConfirmModal";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../Components/UI/LoadingPage";
import handlePriorityFunction from "../../Util/Http";
import { myContext } from "../../Context/MyContext";

const MyNotes = () => {
  const [myNotes, setMyNotes] = useState([]);
  const [activeLink, setActiveLink] = useState("all");
  const [modalShow, setModalShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userID");
  const naviagte=useNavigate();
  const {isDataChanged}=useContext(myContext);

  const handleItemClick = (type) => {
    setActiveLink(type);
  };

  const callNotes=async(level)=>{
    if(userId){
      handleItemClick(level);
      setLoading(true)
      let notes=[];
     notes= await handlePriorityFunction(level,userId);
    if(notes){
      setMyNotes(notes)
      setLoading(false)
    }
    }
    else{
      naviagte("/login")
    }

  }

  useEffect(() => {
  callNotes("all");
  }, [isDataChanged]);

  return (
    <>
      {loading && <LoadingPage />}
      <div className={styles.my_notes_container}>
        <Row>
          <Col sm={4} lg={3} xl={2}>
            <aside className={styles.side_bar}>
              <div className="text-center">
                <button
                  onClick={() => setModalShow(true)}
                  className={styles.add_btn}
                >
                  Add Note +
                </button>
              </div>

              <ul>
                <li
                  className={activeLink === "all" ? styles.active_link : ""}
                  onClick={() => callNotes("all")}
                >
                  <FontAwesomeIcon icon={faClipboard} /> All Notes
                </li>
                <li
                  className={
                    activeLink === "underway" ? styles.active_link : ""
                  }
                  onClick={() => handleItemClick("underway")}
                >
                  <FontAwesomeIcon icon={faCirclePlus} /> Underway
                </li>
                <li
                  className={
                    activeLink === "postponed" ? styles.active_link : ""
                  }
                  onClick={() => handleItemClick("postponed")}
                >
                  <FontAwesomeIcon icon={faClock} /> Postponed
                </li>
                <li
                  className={
                    activeLink === "finished" ? styles.active_link : ""
                  }
                  onClick={() => handleItemClick("finished")}
                >
                  <FontAwesomeIcon icon={faCheckDouble} /> Finished
                </li>
              </ul>
              <div>
                <h4 className={styles.tags_title}>
                  <FontAwesomeIcon icon={faTag} /> Tags
                </h4>
                <ul>
                  <li
                    className={activeLink === "low" ? styles.active_link : ""}
                    onClick={() => callNotes("low")}
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={styles.low_star}
                    />{" "}
                    Low Priority
                  </li>
                  <li
                    className={activeLink === "med" ? styles.active_link : ""}
                    onClick={() => callNotes("med")}
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={styles.medium_star}
                    />{" "}
                    Med Priority
                  </li>
                  <li
                    className={activeLink === "high" ? styles.active_link : ""}
                    onClick={() => callNotes("high")}
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={styles.high_star}
                    />
                    High Priority
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setConfirmShow(true)}
                className={styles.log_out_btn}
              >
                Log Out
              </button>
            </aside>
          </Col>
          <Col sm={8} lg={9} xl={10}>
            <Row className={styles.note_container}>
              {myNotes.map((note) => (
                <NoteBox
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  desc={note.body}
                  priority={note.priority}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </div>
      <AddNoteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ConfirmModal
        show={confirmShow}
        onHide={() => setConfirmShow(false)}
        type="logout"
        msg="Are You Sure That You Want To Logout !"
      />
    </>
  );
};

export default MyNotes;
