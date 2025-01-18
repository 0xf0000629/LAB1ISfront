"use client";

import React, { useEffect, useState } from 'react';
import styles from "../page.module.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function EpicForm({ isOpen, onClose, onSubmit, defaultItem, action, humans}){

  const [climate, setClimate] = useState([ 
    'RAIN_FOREST',
    'MONSOON',
    'TUNDRA',
    'POLAR_ICECAP',
    'DESERT'
  ]);
  const [cSOL, cSOLSet] = useState([ 
    'VERY_HIGH',
    'MEDIUM',
    'LOW',
    'VERY_LOW'
  ]);

  useEffect(() => {
    
  }, []);

  const [cclimate, cclimateSet] = useState("");
  const handleClimate = (event) => {cclimateSet(event.target.value);};
  const [ccQOL, ccQOLSet] = useState("");
  const handleQOL = (event) => {ccQOLSet(event.target.value);};
  const [cGovernor, cGovernorSet] = useState("");
  const handleGovernor = (event) => {cGovernorSet(event.target.value);};

  const [population, setPopulation] = useState(defaultItem.population || "");
  const [area, setArea] = useState(defaultItem.area || "");
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (value < 0) {
      error = `${name} must be greater than or equal to 0.`;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    const error = validateField(id, value);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "population") {
      setPopulation(value);
    } else if (id === "area") {
      setArea(value);
    }
    if (value >= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }
  };



  if (!isOpen) return null; // Do not render if the pop-up is not open
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{action} CITY</h2>
        <form onSubmit={onSubmit} className={styles.reqout}>

          <div className={styles.formGroup}>
            <h2>NAME:</h2>
            <input className={styles.inputbig} defaultValue={defaultItem.name} id="name" name="name" required />
            <h2>Coordinates:</h2>
            <h3>X:</h3>
            <input className={styles.inputbig} defaultValue={defaultItem.coordinates.x} id="x" name="x" required />
            <h3>Y:</h3>
            <input className={styles.inputbig} defaultValue={defaultItem.coordinates.y} id="y" name="y" required />
            <h2>Population:</h2>
            <input className={styles.inputbig} onChange={handleChange} onBlur={handleBlur} defaultValue={defaultItem.population} id="population" name="population" required />
            {errors.population && <p className={styles.error}>{errors.population}</p>}
            <h2>Area:</h2>
            <input className={styles.inputbig} onChange={handleChange} onBlur={handleBlur} defaultValue={defaultItem.area} id="area" name="area" required />
            {errors.area && <p className={styles.error}>{errors.area}</p>}
          </div>
          <div className={styles.formGroup}>
            <h2>Date of establishement:</h2>
            <input className={styles.inputbig} defaultValue={defaultItem.establishment_date.slice(0, 16)} type="datetime-local" id="time" name="time" required />
            <h2>Timezone:</h2>
            <select className={styles.inputbig} name="timezone" id="timezone">
              <option></option>
              <option value="-12:00">(GMT-12:00) International Date Line West</option>
              <option value="-11:00">(GMT-11:00) Midway Island, Samoa</option>
              <option value="-10:00">(GMT-10:00) Hawaii</option>
              <option value="-09:00">(GMT-09:00) Alaska</option>
              <option value="-08:00">(GMT-08:00) Pacific Time (US & Canada)</option>
              <option value="-08:00">(GMT-08:00) Tijuana, Baja California</option>
              <option value="-07:00">(GMT-07:00) Arizona</option>
              <option value="-07:00">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
              <option value="-07:00">(GMT-07:00) Mountain Time (US & Canada)</option>
              <option value="-06:00">(GMT-06:00) Central America</option>
              <option value="-06:00">(GMT-06:00) Central Time (US & Canada)</option>
              <option value="-06:00">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
              <option value="-06:00">(GMT-06:00) Saskatchewan</option>
              <option value="-05:00">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
              <option value="-05:00">(GMT-05:00) Eastern Time (US & Canada)</option>
              <option value="-05:00">(GMT-05:00) Indiana (East)</option>
              <option value="-04:00">(GMT-04:00) Atlantic Time (Canada)</option>
              <option value="-04:00">(GMT-04:00) Caracas, La Paz</option>
              <option value="-04:00">(GMT-04:00) Manaus</option>
              <option value="-04:00">(GMT-04:00) Santiago</option>
              <option value="-03:30">(GMT-03:30) Newfoundland</option>
              <option value="-03:00">(GMT-03:00) Brasilia</option>
              <option value="-03:00">(GMT-03:00) Buenos Aires, Georgetown</option>
              <option value="-03:00">(GMT-03:00) Greenland</option>
              <option value="-03:00">(GMT-03:00) Montevideo</option>
              <option value="-02:00">(GMT-02:00) Mid-Atlantic</option>
              <option value="-01:00">(GMT-01:00) Cape Verde Is.</option>
              <option value="-01:00">(GMT-01:00) Azores</option>
              <option value="+00:00">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
              <option value="+00:00">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
              <option value="+01:00">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
              <option value="+01:00">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
              <option value="+01:00">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
              <option value="+01:00">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
              <option value="+01:00">(GMT+01:00) West Central Africa</option>
              <option value="+02:00">(GMT+02:00) Amman</option>
              <option value="+02:00">(GMT+02:00) Athens, Bucharest, Istanbul</option>
              <option value="+02:00">(GMT+02:00) Beirut</option>
              <option value="+02:00">(GMT+02:00) Cairo</option>
              <option value="+02:00">(GMT+02:00) Harare, Pretoria</option>
              <option value="+02:00">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
              <option value="+02:00">(GMT+02:00) Jerusalem</option>
              <option value="+02:00">(GMT+02:00) Minsk</option>
              <option value="+02:00">(GMT+02:00) Windhoek</option>
              <option value="+03:00">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
              <option value="+03:00">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
              <option value="+03:00">(GMT+03:00) Nairobi</option>
              <option value="+03:00">(GMT+03:00) Tbilisi</option>
              <option value="+03:30">(GMT+03:30) Tehran</option>
              <option value="+04:00">(GMT+04:00) Abu Dhabi, Muscat</option>
              <option value="+04:00">(GMT+04:00) Baku</option>
              <option value="+04:00">(GMT+04:00) Yerevan</option>
              <option value="+04:30">(GMT+04:30) Kabul</option>
              <option value="+05:00">(GMT+05:00) Yekaterinburg</option>
              <option value="+05:00">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
              <option value="+05:30">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
              <option value="+05:30">(GMT+05:30) Sri Jayawardenapura</option>
              <option value="+05:45">(GMT+05:45) Kathmandu</option>
              <option value="+06:00">(GMT+06:00) Almaty, Novosibirsk</option>
              <option value="+06:00">(GMT+06:00) Astana, Dhaka</option>
              <option value="+06:40">(GMT+06:30) Yangon (Rangoon)</option>
              <option value="+07:00">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
              <option value="+07:00">(GMT+07:00) Krasnoyarsk</option>
              <option value="+08:00">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
              <option value="+08:00">(GMT+08:00) Kuala Lumpur, Singapore</option>
              <option value="+08:00">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
              <option value="+08:00">(GMT+08:00) Perth</option>
              <option value="+08:00">(GMT+08:00) Taipei</option>
              <option value="+09:00">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
              <option value="+09:00">(GMT+09:00) Seoul</option>
              <option value="+09:00">(GMT+09:00) Yakutsk</option>
              <option value="+09:30">(GMT+09:30) Adelaide</option>
              <option value="+09:30">(GMT+09:30) Darwin</option>
              <option value="+10:00">(GMT+10:00) Brisbane</option>
              <option value="+10:00">(GMT+10:00) Canberra, Melbourne, Sydney</option>
              <option value="+10:00">(GMT+10:00) Hobart</option>
              <option value="+10:00">(GMT+10:00) Guam, Port Moresby</option>
              <option value="+10:00">(GMT+10:00) Vladivostok</option>
              <option value="+11:00">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
              <option value="+12:00">(GMT+12:00) Auckland, Wellington</option>
              <option value="+12:00">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
              <option value="+13:00">(GMT+13:00) Nuku&#39;alofa</option>
            </select>
            <h2>Capital?</h2>
            <input className={styles.inputbig} defaultChecked={defaultItem.capital} type="checkbox" id="capital" name="capital"/>
            <h2>Meters above sea level:</h2>
            <input className={styles.inputbig} defaultValue={defaultItem.meters_above_sea_level} id="macl" name="macl" required />
          </div>
          <div className={styles.formGroup}>
            <h2>Car code:</h2>
            <input className={styles.inputbig} defaultValue={defaultItem.car_code} id="code" name="code" required />
            <h2>Climate:</h2>
            <select className={styles.inputbig} defaultValue={climate.indexOf(defaultItem.climate)+1} onChange={handleClimate} id="climate" name="climate">
              {climate.map((option, id) => (
                <option key={option} value={id+1}>
                  {option}
                </option>
              ))}
            </select>
            <h2>Standard of life:</h2>
            <select className={styles.inputbig} defaultValue={cSOL.indexOf(defaultItem.standardOfLiving)+1} onChange={handleQOL} id="qol" name="qol">
              {cSOL.map((option, id) => (
                <option key={option} value={id+1}>
                  {option}
                </option>
              ))}
            </select>
            <h2>Governor:</h2>
            <select className={styles.inputbig} defaultValue={defaultItem.governor.id} onChange={handleGovernor} id="governor" name="governor">
              {humans.map((option, id) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <input className={styles.inputbig} defaultValue={defaultItem.id} id="id" name="id" hidden/>
            <button type="submit" className={styles.submitButton}  disabled={!!errors.population || !!errors.area}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};