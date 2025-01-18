"use client";

import Image from "next/image";
import styles from "../page.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfilePanel from "../profilepanel";

let basedata = [
  {
    id: 36,
    username: "mike",
    isAdmin: false
  }
];

export default function Unactive() {
  const [token, setToken] = useState(undefined);

  const router = useRouter();
  const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

  const [searchbar, setSearch] = useState("");
  const [reroll, setReroll] = useState(0);
  const [me, setMe] = useState({
    username: "guest",
    isadmin: false
  });

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const fetchMe = async () => {
    if (localStorage.getItem("me") != undefined) {
      let loadme = JSON.parse(localStorage.getItem("me"));
      setMe(loadme);
    }
  };

  const fetchLead = async () => {
    try {
      const response = await fetch(process.env.AUTH, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("epic");
        setLoading(false);
        let jsondata = response.json().then(jsondata => {
          let loaded = [];
          for (let i = 0; i < jsondata.length; i++) {
            let item = jsondata[i];
            loaded.push({
              id: item.id,
              username: item.username,
              isAdmin: item.cool
            });
          }
          setData(loaded);
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function activate(id) {
    const response = await fetch(process.env.AUTH + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log("user activated");
      fetchLead();
    } else {
      console.log(response);
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setToken(authToken);
    if (!authToken) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchLead();
    fetchMe();
    setReroll(reroll + 1);
  }, [token]);

  if (me.isadmin)
  return (
    <div className={styles.page}>
      {console.log("redraw")}
      <header className={styles.header}>
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
        <h1>NOT ADMINS</h1>
        <input className={styles.inputbig} 
          type="text"
          placeholder="Search..."
          value={searchbar}
          onChange={handleSearch}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <div className={styles.reqin}>
          <ClipLoader color="#999999" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" className={styles.reqout}/>
          {data
            .filter(item => item.username.startsWith(searchbar))
            .filter(item => (item.isAdmin == false))
            .slice(0, 100)
            .map((player, i) => (
              <div
                key={"plaque" + i}
                className={styles.reqout}
              >
                <div className={styles.leader}>
                  <h2> {player.username} </h2>
                  ID: {player.id}
                </div>
                <div className={styles.leader}>
                  <button
                    className={styles.normalbutton}
                    onClick={() => activate(player.id)}
                  >
                    MAKE INTO ADMIN
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
  else
    return("forbidden");
}
