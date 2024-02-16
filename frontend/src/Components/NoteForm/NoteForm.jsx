import React, { useState } from "react";
import styles from "./NoteForm.module.css";

const NoteForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendFormData = (data) => {
    console.log(data);
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
          name="desc"
          id="desc"
          placeholder="description"
          value={formData.desc}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>
      <div className="text-end mt-4">
        <button type="submit" className={styles.submit_btn}>
          Add Now
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
