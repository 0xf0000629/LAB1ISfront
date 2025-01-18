"use client";

import Image from "next/image";
import styles from "../page.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import RequestComp from "./requestcomp";
import EpicForm from "./epicform";
import ProfilePanel from "../profilepanel";
import { useRouter } from "next/navigation";
import { UNDERSCORE_NOT_FOUND_ROUTE } from "next/dist/shared/lib/constants";

let basedata = [
  {
    id: 1,
    name: "Joe Mama",
    age: 20,
    height: 2,
    added_by: "IDK"
  },
];
let basebuilding = [
  {
    name: "Joe Mama St.",
    rooms: ["100", "101", "102"],
  },
  {
    name: "Mike Oxlong St.",
    rooms: ["200", "201", "202"],
  },
];
/*for (let i=2;i<=50;i++){
  basedata.push({
    "id": i,
    "room": Math.floor(Math.random()*1000%300),
    "building": "ADDRESS",
    "time": "2020-11-20 11:30:00",
    "moderator_id": 23,
    "moderator_firstname": "richard",
    "moderator_secondname": "harrys",
    "moderator_elo": 2300,
    "players": [
      {
        "id": 36,
        "firstname": "mike",
        "secondname": "hawk",
        "elo": 2300,
      },
      {
        "id": 49,
        "firstname": "may",
        "secondname": "coxlon",
        "elo": 2300,
      }
    ]
  });
}*/
export default function Requests() {
  const [token, setToken] = useState(undefined);

  const [count, setCount] = useState(1);

  const [modpriv, setmodpriv] = useState(0);

  const [formActive, setForm] = useState(false);

  const [data, setData] = useState([]);
  const [humandata, setHumanData] = useState([]);

  const [statusbar, setStatus] = useState("");

  const [what_do, setWhatDo] = useState(() => {});
  const [what_do_title, setWhatDoTitle] = useState("");
  const [defaultItem, setDItem] = useState({
    id: "",
    name: "",
    age: "",
    height: ""
  });

const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [reroll, setReroll] = useState(0);
  const [me, setMe] = useState({
    username: "guest",
    isAdmin: false
  });

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setToken(authToken); // Triggers the useEffect below
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchReqs(token);
      fetchMe(token);
    }
  }, [token]);

  const formOpen = (obj) => {
    setDItem(obj);
    setForm(true);
  };
  const formClose = () => {
    setForm(false);
  };

  const increment = () => {
    if (count < Math.floor(data.length / 20) + 1) setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const fetchReqs = async () => {
    const response = await fetch(process.env.HUMAN, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setLoading(false);
      console.log("epic");
      let jsondata = response.json().then(jsondata => {
        let loaded = [];
        for (let i = 0; i < jsondata.length; i++) {
          let item = jsondata[i];
          loaded.push({
            id: item.id,
            name: item.name,
            age: item.age,
            height: item.height,
            added_by: item.added_by
          });
        }
        setData(loaded);
      });
    } else console.log(response);
  };

  const fetchMe = async () => {
    if (localStorage.getItem("me") != undefined) {
      let loadme = JSON.parse(localStorage.getItem("me"));
      setMe(loadme);
    }
  };

  const create_req = async e => {
    e.preventDefault();
    formClose();
    const formData = new FormData(e.target);
    const reqdata = Object.fromEntries(formData.entries());
    const now = new Date();
    const response = await fetch(process.env.HUMAN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: reqdata.name,
        age: reqdata.age,
        height: reqdata.height,
        added_by: me.username
      }),
    });

    if (response.ok) {
      setStatus("Person created.");
      fetchReqs();
    } else setStatus("Couldn't create a person.");;
  };


  const update_req = async (e) => {
    e.preventDefault();
    formClose();
    const formData = new FormData(e.target);
    const reqdata = Object.fromEntries(formData.entries());
    const now = new Date();
    const response = await fetch(process.env.HUMAN + "/" + reqdata.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: reqdata.name,
        age: reqdata.age,
        height: reqdata.height
      }),
    });

    if (response.ok) {
      setStatus("Person updated.");
      fetchReqs();
    } else setStatus("Couldn't update a person...");
  };

  async function deleteit(id, modpriv) {
    const index = data.find(item => item.id === id);
    const username = data.find(item => item.id === id).created_by;
    if (index !== -1) {
      if (username == me.username || modpriv){
        const response = await fetch(process.env.CITIES + "/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
    
        if (response.ok) {
          setStatus("Person deleted.");
          fetchReqs();
        } else console.log(response);
      }
    } else setStatus("This person is tied to a city! Search them in the city tab.");
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <EpicForm
          isOpen={formActive}
          onClose={formClose}
          onSubmit={what_do}
          defaultItem={defaultItem}
          action={what_do_title}
        />
        <button
          className={styles.maxbutton}
          onClick={() => router.push("/cities.html")}
        >
          CITIES
        </button>
        <button
          className={styles.maxbutton}
          onClick={() => router.push("/people.html")}
        >
          PEOPLE
        </button>
        <ProfilePanel name={me.username} token={token} />
      </header>
      <main className={styles.main}>
        <h1>THE PEOPLE</h1>
        <button className={styles.roundbutton} onClick={() => {setWhatDo(() => create_req); setWhatDoTitle("CREATE"); 
          formOpen({
            name: "",
            age: "",
            height: ""
          });}}>
          +
        </button>
        <div className={styles.req}>
        <ClipLoader color="#999999" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" className={styles.reqout}/>
          {data.slice((count - 1) * 20, count * 20).map((request, i) => (
            <RequestComp
              person={request}
              key={i}
              idp={request.id}
              updatebutton={
                (me.isAdmin || me.username == request.added_by) ? 
                () => {setWhatDo(() => update_req); setWhatDoTitle("UPDATE"); formOpen(request);} : undefined
              }
              deletebutton={
                (me.isAdmin || me.username == request.added_by) ? 
                () => deleteit(request.id, me.isAdmin) : undefined
              }
            />
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        <button className={styles.roundbutton} onClick={decrement}>
          -
        </button>
        <h1>{count}</h1>
        <button className={styles.roundbutton} onClick={increment}>
          +
        </button>
      </footer>
    </div>
  );
}
