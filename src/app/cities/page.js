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

  const [comparePH, setCPH] = useState("name");

  const handleCPH = (event) => {
    setCPH(event.target.value);
  };

  const [minSOL, setminSOL] = useState("");
  const handleminSOL = (event) => {
    setminSOL(event.target.value);
  };

  const [cityid1, setcityid1] = useState("");
  const handlecityid1 = (event) => {
    setcityid1(event.target.value);
  };
  const [cityid2, setcityid2] = useState("");
  const handlecityid2 = (event) => {
    setcityid2(event.target.value);
  };

  function compfunc(a, b){
    switch (comparePH){
      case "name": return a.name > b.name;
      case "cx": return a.coordinates.x > b.coordinates.x;
      case "cy": return a.coordinates.y > b.coordinates.y;
      case "creationdate": return a.creation_date > b.creation_date;
      case "createdby": return a.created_by > b.created_by;
      case "area": return a.area > b.area;
      case "population": return a.population > b.population;
      case "estdate": return a.establishment_date > b.establishment_date;
      case "capital": return a.capital > b.capital;
      case "masl": return a.meters_above_sea_level > b.meters_above_sea_level;
      case "carcode": return a.car_code > b.car_code;
      case "climate": return a.climate > b.climate;
      case "SOL": return a.standardOfLiving > b.standardOfLiving;
      case "govname": return a.governor.name > b.governor.name;
      case "govage": return a.governor.age > b.governor.age;
      case "govheight": return a.governor.height > b.governor.height;
    }
  }

  const [filterName, setfilterName] = useState("");
  const handlefilterName = (event) => { setfilterName(event.target.value); };

  const [filterCx, setfilterCx] = useState("");
  const handlefilterCx = (event) => { setfilterCx(event.target.value); };

  const [filterCy, setfilterCy] = useState("");
  const handlefilterCy = (event) => { setfilterCy(event.target.value); };

  const [filterCreationdate, setfilterCreationdate] = useState("");
  const handlefilterCreationdate = (event) => { setfilterCreationdate(event.target.value); };

  const [filterCreatedby, setfilterCreatedby] = useState("");
  const handlefilterCreatedby = (event) => { setfilterCreatedby(event.target.value); };

  const [filterArea, setfilterArea] = useState("");
  const handlefilterArea = (event) => { setfilterArea(event.target.value); };

  const [filterPopulation, setfilterPopulation] = useState("");
  const handlefilterPopulation = (event) => { setfilterPopulation(event.target.value); };

  const [filterEstdate, setfilterEstdate] = useState("");
  const handlefilterEstdate = (event) => { setfilterEstdate(event.target.value); };

  const [filterCapital, setfilterCapital] = useState("");
  const handlefilterCapital = (event) => { setfilterCapital(event.target.value); };

  const [filterMasl, setfilterMasl] = useState("");
  const handlefilterMasl = (event) => { setfilterMasl(event.target.value); };

  const [filterCarcode, setfilterCarcode] = useState("");
  const handlefilterCarcode = (event) => { setfilterCarcode(event.target.value); };

  const [filterClimate, setfilterClimate] = useState("");
  const handlefilterClimate = (event) => { setfilterClimate(event.target.value); };

  const [filterSOL, setfilterSOL] = useState("");
  const handlefilterSOL = (event) => { setfilterSOL(event.target.value); };

  const [filterGovname, setfilterGovname] = useState("");
  const handlefilterGovname = (event) => { setfilterGovname(event.target.value); };

  const [filterGovage, setfilterGovage] = useState("");
  const handlefilterGovage = (event) => { setfilterGovage(event.target.value); };

  const [filterGovheight, setfilterGovheight] = useState("");
  const handlefilterGovheight = (event) => { setfilterGovheight(event.target.value); };


  const [what_do, setWhatDo] = useState(() => {});
  const [what_do_title, setWhatDoTitle] = useState("");
  const [defaultItem, setDItem] = useState({
    id: "",
    name: "",
    coordinates:{
      x: "",
      y: ""
    },
    creation_date: "",
    created_by: "",
    area: "",
    population: "",
    establishment_date: "",
    capital: false,
    meters_above_sea_level: "",
    car_code: "",
    climate: "",
    standardOfLiving: "",
    governor: ""
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
      fetchPeople(token);
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
              id: item.governor.id,
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

  const fetchAVRG = async () => {
    const response = await fetch(process.env.CITIES + "/avrgMASL", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log("epic");
      let jsondata = response.json().then(jsondata => {
        alert(jsondata);
      });
    } else console.log(response);
  };

  const fetchSOL = async () => {
    const response = await fetch(process.env.CITIES + "/minSOL?minSOL=" + minSOL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log("epic");
      let jsondata = response.json().then(jsondata => {
        alert(jsondata);
      });
    } else console.log(response);
  };

  const fetchUC = async () => {
    const response = await fetch(process.env.CITIES + "/uniqueC", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log("epic");
      let jsondata = response.json().then(jsondata => {
        alert(jsondata);
      });
    } else console.log(response);
  };

  const send1to2 = async () => {
    const response = await fetch(process.env.CITIES + "/toanother?id1=" + cityid1 + "&id2=" + cityid2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log("epic");
      fetchReqs();
    } else console.log(response);
  };

  const send1tomin = async () => {
    const response = await fetch(process.env.CITIES + "/tosmallest?id1=" + cityid1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log("epic");
      fetchReqs();
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
        climate: Number(reqdata.climate)-1,
        standardOfLiving: Number(reqdata.qol)-1,
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
    const response = await fetch(process.env.CITIES + "/" + reqdata.id, {
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
        climate: Number(reqdata.climate)-1,
        standardOfLiving: Number(reqdata.qol)-1,
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
          defaultItem={defaultItem}
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
        <button className={styles.roundbutton} onClick={() => {setWhatDo(() => create_req); setWhatDoTitle("CREATE"); formOpen({
          id: "",
          name: "",
          coordinates:{
            x: "",
            y: ""
          },
          creation_date: "",
          created_by: "",
          area: "",
          population: "",
          establishment_date: "",
          capital: false,
          meters_above_sea_level: "",
          car_code: "",
          climate: "",
          standardOfLiving: "",
          governor: ""
        });}}>
          +
        </button>
        <div className={styles.req}>
          <ClipLoader color="#999999" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" className={styles.reqout}/>
          <table className={styles.tableblur}><tbody>
            <tr>
              <th>ID</th>
              <th onClick={() => setCPH("name")}>Name</th>
              <th onClick={() => setCPH("cx")}>X</th>
              <th onClick={() => setCPH("cy")}>Y</th>
              <th onClick={() => setCPH("creationdate")}>Creation date</th>
              <th onClick={() => setCPH("createdby")}>Created by</th>
              <th onClick={() => setCPH("area")}>Area</th>
              <th onClick={() => setCPH("population")}>Population</th>
              <th onClick={() => setCPH("estdate")}>Establishment date</th>
              <th onClick={() => setCPH("capital")}>Capital</th>
              <th onClick={() => setCPH("masl")}>Meters above sea level</th>
              <th onClick={() => setCPH("carcode")}>Car code</th>
              <th onClick={() => setCPH("climate")}>Climate</th>
              <th onClick={() => setCPH("SOL")}>Standard of living</th>
              <th onClick={() => setCPH("govname")}>Governor name</th>
              <th onClick={() => setCPH("govage")}>Governor age</th>
              <th onClick={() => setCPH("govheight")}>Governor height</th>
              <th onClick={() => alert("whar?")}>Actions</th>
            </tr>
            <tr>
              <th></th>
              <th><input key="0" type="text" className={styles.tinyinput} value={filterName} onChange={handlefilterName}></input></th>
              <th><input key="1" type="text" className={styles.tinyinput} value={filterCx} onChange={handlefilterCx}></input></th>
              <th><input key="2" type="text" className={styles.tinyinput} value={filterCy} onChange={handlefilterCy}></input></th>
              <th><input key="3" type="text" className={styles.tinyinput} value={filterCreationdate} onChange={handlefilterCreationdate}></input></th>
              <th><input key="4" type="text" className={styles.tinyinput} value={filterCreatedby} onChange={handlefilterCreatedby}></input></th>
              <th><input key="5" type="text" className={styles.tinyinput} value={filterArea} onChange={handlefilterArea}></input></th>
              <th><input key="6" type="text" className={styles.tinyinput} value={filterPopulation} onChange={handlefilterPopulation}></input></th>
              <th><input key="7" type="text" className={styles.tinyinput} value={filterEstdate} onChange={handlefilterEstdate}></input></th>
              <th><input key="8" type="text" className={styles.tinyinput} value={filterCapital} onChange={handlefilterCapital}></input></th>
              <th><input key="9" type="text" className={styles.tinyinput} value={filterMasl} onChange={handlefilterMasl}></input></th>
              <th><input key="A" type="text" className={styles.tinyinput} value={filterCarcode} onChange={handlefilterCarcode}></input></th>
              <th><input key="B" type="text" className={styles.tinyinput} value={filterClimate} onChange={handlefilterClimate}></input></th>
              <th><input key="C" type="text" className={styles.tinyinput} value={filterSOL} onChange={handlefilterSOL}></input></th>
              <th><input key="D" type="text" className={styles.tinyinput} value={filterGovname} onChange={handlefilterGovname}></input></th>
              <th><input key="E" type="text" className={styles.tinyinput} value={filterGovage} onChange={handlefilterGovage}></input></th>
              <th><input key="F" type="text" className={styles.tinyinput} value={filterGovheight} onChange={handlefilterGovheight}></input></th>
            </tr>
          {data.sort(compfunc)
          .filter(item => item.name.includes(filterName))
          .filter(item => (""+item.coordinates.x).includes(filterCx))
          .filter(item => (""+item.coordinates.y).includes(filterCy))
          .filter(item => item.creation_date.includes(filterCreationdate))
          .filter(item => item.created_by.includes(filterCreatedby))
          .filter(item => (""+item.area).includes(filterArea))
          .filter(item => (""+item.population).includes(filterPopulation))
          .filter(item => item.establishment_date.includes(filterEstdate))
          .filter(item => (""+item.capital).includes(filterCapital))
          .filter(item => (""+item.meters_above_sea_level).includes(filterMasl))
          .filter(item => (""+item.car_code).includes(filterCarcode))
          .filter(item => item.climate.includes(filterClimate))
          .filter(item => item.standardOfLiving.includes(filterSOL))
          .filter(item => item.governor.name.includes(filterGovname))
          .filter(item => (""+item.governor.age).includes(filterGovage))
          .filter(item => (""+item.governor.height).includes(filterGovheight))
          .slice((count - 1) * 10, count * 10).map((request, i) => (
            <tr>
              <td>{request.id}</td>
              <td>{request.name}</td>
              <td>{request.coordinates.x}</td>
              <td>{request.coordinates.y}</td>
              <td>{request.creation_date}</td>
              <td>{request.created_by}</td>
              <td>{request.area}</td>
              <td>{request.population}</td>
              <td>{request.establishment_date}</td>
              <td>{""+request.capital}</td>
              <td>{request.meters_above_sea_level}</td>
              <td>{request.car_code}</td>
              <td>{request.climate}</td>
              <td>{request.standardOfLiving}</td>
              <td>{request.governor.name}</td>
              <td>{request.governor.age}</td>
              <td>{request.governor.height}</td>
              <td>
              {(me.isadmin || me.username == request.created_by) ? 
              <button className={styles.tinybutton} onClick={() => {setWhatDo(() => update_req); setWhatDoTitle("UPDATE"); formOpen(request);}}>
                UPDATE
              </button> : <button></button>
              }
              {(me.isadmin || me.username == request.created_by) ? 
              <button className={styles.tinybutton} onClick={() => deleteit(request.id, me.isadmin)}>
                DELETE
              </button> : <button></button>
              }
              </td>
            </tr>
          ))}
          </tbody>
          </table>
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
        <button className={styles.normalbutton} onClick={fetchAVRG}>
          Average MASL
        </button>
        <div className={styles.reqout}>
          <input key="0" type="text" className={styles.tinyinput} value={minSOL} onChange={handleminSOL}></input>
          <button className={styles.tinybutton} onClick={fetchSOL}>
            Cities worse
          </button>
        </div>
        <button className={styles.normalbutton} onClick={fetchUC}>
          Unique climate
        </button>
        <div className={styles.reqout}>
          <input key="1" type="text" className={styles.tinyinput} value={cityid1} onChange={handlecityid1}></input>
          <input key="2" type="text" className={styles.tinyinput} value={cityid2} onChange={handlecityid2}></input>
          <button className={styles.tinybutton} onClick={send1to2}>
            1 to 2
          </button>
          <button className={styles.tinybutton} onClick={send1tomin}>
            1 to min
          </button>
        </div>
      </footer>
    </div>
  );
}
