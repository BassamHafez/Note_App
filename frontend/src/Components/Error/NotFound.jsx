import React from 'react'
import styles from "./NoteFound.module.css";
import not_found from "../../assets/notFound.png";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const naviagte =useNavigate();

  const navigateToPrevPage=()=>{
    naviagte(-1)
  }

  return (
    <div className={styles.not_found_page}>
      <img src={not_found} alt="not found error 404" />
      <span>Oops! Something went wrong <button onClick={navigateToPrevPage}>Reload</button></span>
    </div>
  )
}

export default NotFound
