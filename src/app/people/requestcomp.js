import styles from "../page.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

export default function RequestComp({
  person,
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
        <h2>Name: {person.name}</h2>
        <h3>Age: {person.age}</h3>
        <h3>Height: {person.height}</h3>
        <h3>Added by: {person.added_by}</h3>
        ID: {person.id}
      </div>
      <div key={"buttons" + id} className={styles.reqin}>
        {updatebutton && (
          <button className={styles.normalbutton} onClick={(e) => updatebutton(e)}>
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
