import React, { useState } from "react";
import styles from "./NoteForm.module.css";
import axios from "axios";

const UpdateNoteForm = ({ currenTitle, currentDesc, level, id }) => {
  const [formData, setFormData] = useState({
    title: currenTitle,
    body: currentDesc,
    priority: level,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendFormData = async(data) => {
    try{
      const response=await axios.put(`http://localhost:4444/notes/:${id}`,data)
      console.log(response)
    }
    catch(error){
      console.error(error)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendFormData(formData);
  };

  return (
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
            id="medium"
            name="priority"
            value="medium"
            onChange={handleChange}
            checked={formData.priority === "medium"}
          />
          <label htmlFor="medium">medium</label>
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
          Update Now
        </button>
      </div>
    </form>
  );
};

export default UpdateNoteForm;
