import React, { useState } from "react";
import styles from "./NoteForm.module.css";
import axios from "axios";

const NoteForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    priority: "low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendFormData = async(data) => {
    try{
      const response=await axios.post(`http://localhost:4444/notes`,data)
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
          name="desc"
          id="desc"
          placeholder="description"
          value={formData.desc}
          onChange={handleChange}
          rows={5}
        />
      </div>
      <div className="d-flex justify-content-evenly align-items-center my-4">
        <div className={styles.select_item}>
          <input type="radio" id="low" name="priority" value="low" onChange={handleChange}/>
          <label htmlFor="low">low</label>
        </div>

        <div className={styles.select_item}>
          <input type="radio" id="medium" name="priority" value="medium" onChange={handleChange}/>
          <label htmlFor="medium">medium</label>
        </div>

        <div className={styles.select_item}>
          <input type="radio" id="high" name="priority" value="high" onChange={handleChange}/>
          <label htmlFor="high">high</label>
        </div>
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
