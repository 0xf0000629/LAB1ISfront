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
    name: "HORRENDOUS CITY",
    coordinates:{
      x: 2.3333,
      y: 2.2222
    },
    creation_date: "2020-11-20 11:30:00",
    created_by: "BSM",
    area: 30000,
    population: 2000,
    establishment_date: "2020-11-20 11:30:00",
    capital: true,
    meters_above_sea_level: 30,
    car_code: 2032,
    climate: "SHIT",
    standardOfLiving: "ASS",
    governor: {
      name: "Joe Mama",
      age: 20,
      height: 2
    }
  },
];
let humandata = [
  {
    id: 1,
    name: "Joe Mother",
    age: 30,
    height: 2  
  }
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

  const [what_do, setWhatDo] = useState(() => {});
  const [what_do_title, setWhatDoTitle] = useState("");

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
      fetchPeople(token);
      fetchMe(token);
    }
  }, [token]);

  const formOpen = () => {
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
    const response = await fetch(process.env.CITIES, {
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
            coordinates:{
              x: item.coordinates.x,
              y: item.coordinates.y
            },
            creation_date: item.creation_date,
            created_by: item.created_by,
            area: item.area,
            population: item.population,
            establishment_date: item.establishment_date,
            capital: item.capital,
            meters_above_sea_level: item.meters_above_sea_level,
            car_code: item.car_code,
            climate: item.climate,
            standardOfLiving: item.standardOfLiving,
            governor: {
              name: item.governor.name,
              age: item.governor.age,
              height: item.governor.height
            }
          });
        }
        setData(loaded);
      });
    } else console.log(response);
  };
  const fetchPeople = async () => {
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
            height: item.height
          });
        }
        setHumanData(loaded);
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
    const response = await fetch(process.env.CITIES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: reqdata.name,
        coordinates: {
          x: Number(reqdata.x),
          y: Number(reqdata.y)
        },
        creation_date: now.toISOString(),
        created_by: me.username,
        area: Number(reqdata.area),
        population: Number(reqdata.population),
        establishment_date: reqdata.time + ":00" + reqdata.timezone,
        capital: ((reqdata.capital).toString() !== "false"),
        meters_above_sea_level: Number(reqdata.macl),
        car_code: Number(reqdata.code),
        climate: reqdata.climate,
        standardOfLiving: reqdata.qol,
        governor: {
          id: Number(reqdata.governor)
        }
      }),
    });

    if (response.ok) {
      fetchReqs();
    } else console.log(response);
  };


  const update_req = async e => {
    e.preventDefault();
    formClose();
    const formData = new FormData(e.target);
    const reqdata = Object.fromEntries(formData.entries());
    const now = new Date();
    const response = await fetch(process.env.CITIES, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: reqdata.name,
        coordinates: {
          id: Number(reqdata.x)
        },
        creation_date: now.toISOString(),
        created_by: me.username,
        area: Number(reqdata.area),
        population: Number(reqdata.population),
        establishment_date: reqdata.time + ":00" + reqdata.timezone,
        capital: ((reqdata.capital).toString() !== "false"),
        meters_above_sea_level: Number(reqdata.macl),
        car_code: Number(reqdata.code),
        climate: reqdata.climate,
        standardOfLiving: reqdata.qol,
        governor: {
          id: Number(reqdata.governor)
        }
      }),
    });

    if (response.ok) {
      fetchReqs();
    } else console.log(response);
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
          fetchReqs();
        } else console.log(response);
      }
    } else console.log("this request doesn't exist");
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <EpicForm
          isOpen={formActive}
          onClose={formClose}
          onSubmit={what_do}
          action={what_do_title}
          humans={humandata}
        />
        <button
          className={styles.maxbutton}
          onClick={() => router.push("/cities")}
        >
          CITIES
        </button>
        <button
          className={styles.maxbutton}
          onClick={() => router.push("/people")}
        >
          PEOPLE
        </button>
        <ProfilePanel name={me.username} token={token} />
      </header>
      <main className={styles.main}>
        <h1>THE CITIES</h1>
        <button className={styles.roundbutton} onClick={() => {setWhatDo(() => create_req); setWhatDoTitle("CREATE"); formOpen();}}>
          +
        </button>
        <div className={styles.req}>
        <ClipLoader color="#999999" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" className={styles.reqout}/>
          {data.slice((count - 1) * 20, count * 20).map((request, i) => (
            <RequestComp
              city={request}
              key={i}
              updatebutton={
                (me.isAdmin || me.username == request.created_by) ? 
                () => {setWhatDo(() => update_req); setWhatDoTitle("UPDATE"); formOpen(request.id);} : undefined
              }
              deletebutton={
                (me.isAdmin || me.username == request.created_by) ? 
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
