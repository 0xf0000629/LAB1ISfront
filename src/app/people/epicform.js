"use client";

import React, { useEffect, useState } from 'react';
import styles from "../page.module.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function EpicForm({ isOpen, onClose, onSubmit, defaultItem, action }){

  useEffect(() => {
  }, []);

  


  if (!isOpen) return null; // Do not render if the pop-up is not open
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{action} PERSON</h2>
        <form onSubmit={onSubmit} className={styles.reqout}>

          <div className={styles.formGroup}>
            <h2>Name:</h2>
            <input className={styles.inputbig} defaultValue={defaultItem.name} id="name" name="name" required />
            <h3>Age:</h3>
            <input className={styles.inputbig} defaultValue={defaultItem.age} id="age" name="age" required />
            <h2>Height:</h2>
            <input className={styles.inputbig} defaultValue={defaultItem.height} id="height" name="height" required />
            <input className={styles.inputbig} defaultValue={defaultItem.id} id="id" name="id" hidden/>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};