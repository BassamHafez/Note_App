import React, { useState } from "react";
import styles from "./NoteForm.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const UpdateNoteForm = ({
  currenTitle,
  currentDesc,
  level,
  id,
  onHide,
  setResponseMessage,
  setSuccessResponse,
  setShowResponse,
}) => {
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userID");

  const [formData, setFormData] = useState({
    title: currenTitle,
    body: currentDesc,
    priority: level,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendFormData = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:4444/notes`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            userId: userId,
          },
          params:{
            id:id
          }
        }
      );
      console.log(response);
      setLoading(false);
      setResponseMessage({
        title: "Update Successfully",
        content: "Your New Note has been Updated Successfully",
      });
      setSuccessResponse(true);
      setShowResponse(true);
      onHide();
    } catch (error) {
      console.error(error);
      setResponseMessage({
        title: "Update Note Faild",
        content: "Your New Note faild to be Updated please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
      onHide();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendFormData(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.input_field}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_field}>
          <textarea
            name="body"
            id="body"
            placeholder="body"
            value={formData.body}
            onChange={handleChange}
            rows={5}
          />
        </div>
        <div className="d-flex justify-content-evenly align-items-center my-4">
          <div className={styles.select_item}>
            <input
              type="radio"
              id="low"
              name="priority"
              value="low"
              onChange={handleChange}
              checked={formData.priority === "low"}
            />
            <label htmlFor="low">low</label>
          </div>

          <div className={styles.select_item}>
            <input
              type="radio"
              id="med"
              name="priority"
              value="med"
              onChange={handleChange}
              checked={formData.priority === "med"}
            />
            <label htmlFor="med">medium</label>
          </div>

          <div className={styles.select_item}>
            <input
              type="radio"
              id="high"
              name="priority"
              value="high"
              onChange={handleChange}
              checked={formData.priority === "high"}
            />
            <label htmlFor="high">high</label>
          </div>
        </div>
        <div className="text-end mt-4">
          <button type="submit" className={styles.submit_btn}>
            {loading ? <FontAwesomeIcon icon={faSpinner} /> : "Update Now"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateNoteForm;
