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
    elo: 2300,
    rank: "GOAT",
    matches: 120,
  },
  {
    id: 49,
    username: "may",
    elo: 2300,
    rank: "GOAT",
    matches: 120,
  },
];

export default function Leaderboard() {
  const [token, setToken] = useState(undefined);

  const router = useRouter();
  const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

  const [searchbar, setSearch] = useState("");
  const [reroll, setReroll] = useState(0);
  const [me, setMe] = useState({
    id: -1,
    firstname: "Guest",
    secondname: "hawk",
    elo: 2300,
    active: true,
    ismod: false, isadmin: false,
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
      const response = await fetch(process.env.LEADERBOARD, {
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
              elo: item.elo,
              rank: item.rank,
              matches: item.totalMatches,
            });
          }
          setData(loaded);
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

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

  const sendtoprofile = id => {
    router.push("/profile/" + id);
  };

  return (
    <div className={styles.page}>
      {console.log("redraw")}
      <header className={styles.header}>
        <button
          className={styles.maxbutton}
          onClick={() => router.push("/requests.html")}
        >
          REQUESTS
        </button>
        <button
          className={styles.maxbutton}
          onClick={() => router.push("/matches.html")}
        >
          MATCHES
        </button>
        <button
          className={styles.maxbutton}
          onClick={() => router.push("/leaderboard.html")}
        >
          LEADERBOARDS
        </button>
        <ProfilePanel name={me.firstname} token={token} />
      </header>
      <main className={styles.main}>
        <h1>LEADERBOARDS</h1>
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
            .slice(0, 100)
            .map((player, i) => (
              <button
                key={"plaque" + i}
                className={styles.leadercard}
                onClick={() => sendtoprofile(player.id)}
              >
                <div className={styles.leader}>
                  <h2> {player.username} </h2>
                </div>
                <div className={styles.leader}>
                  <h2>
                    {" "}
                    {player.elo}, {player.rank}
                  </h2>
                </div>
                <div className={styles.leader}>
                  <h2> Matches played: {player.matches} </h2>
                </div>
              </button>
            ))}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
