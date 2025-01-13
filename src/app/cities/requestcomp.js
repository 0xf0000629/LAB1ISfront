import styles from "../page.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

export default function RequestComp({
  city,
  id,
  updatebutton,
  deletebutton,
}) {
  const router = useRouter();
  function timeconv(time) {
    const date = new Date(time);
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
    return formattedDate;
  }
  return (
    <div className={styles.reqout}>
      <div key={"info" + id} className={styles.reqin}>
        <h2>Name: {city.name}, {city.capital === true ? "capital" : ""}</h2>
        <h3>Coordiantes: {city.coordinates.x}, {city.coordinates.y}</h3>
        <h3>Area: {city.area}, {city.meters_above_sea_level} above sea level</h3>
        <h3>Population: {city.population}</h3>
        Established at {timeconv(city.establishment_date)}
      </div>
      <div key={"living" + id} className={styles.reqin}>
        <h2>Climate: {city.climate}</h2>
        <h2>QOL: {city.standardOfLiving}</h2>
        <h3>Governor: {city.governor.name}, {city.governor.age}</h3>
      </div>
      <div key={"player" + id} className={styles.reqin}>
        <h3>Created at {timeconv(city.creation_date)}</h3>
        <h3>Created by {city.created_by}</h3>
      </div>
      <div key={"buttons" + id} className={styles.reqin}>
        {updatebutton && (
          <button className={styles.normalbutton} onClick={updatebutton}>
            UPDATE
          </button>
        )}
        {deletebutton && (
          <button className={styles.normalbutton} onClick={deletebutton}>
            DELETE
          </button>
        )}
      </div>
    </div>
  );
}
