"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [token, setToken] = useState(undefined);

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [me, setMe] = useState({
    placeholder: true,
  });

  const [badpass, setBP] = useState(0);

  const [activeForm, setActiveForm] = useState("login");

  const handleLog = e => {
    setusername(e.target.value);
  };
  const handlePass = e => {
    setpassword(e.target.value);
  };

  async function fetchMe(info) {
    const response = await fetch(process.env.AUTH + "/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${info}`,
      },
    });
    if (response.ok) {
      console.log("got you");
      let jsondata = response.json().then(jsondata => {
        const newme = {
          id: jsondata.id,
          username: jsondata.username,
          isadmin: jsondata.cool,
        };
        localStorage.setItem("me", JSON.stringify(newme));
        setMe(newme);
      });
    } else console.log(response);
  }

  const logEmIn = async e => {
    e.preventDefault();
    console.log(`"Login:": ${username}, "Password:": ${password}`);
    try {
      const response = await fetch(process.env.AUTH + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.ok) {
        let token = await response.json().then(token  => {
          console.log("got this: " + token.authToken);
          localStorage.setItem("authToken", token.authToken);
          setToken(localStorage.getItem("authToken"));
        });
      } else {
        console.log(response);
        setBP(1);
      }
    }
    catch (e) {setBP(1);}
  };

  const regEmIn = async e => {
    e.preventDefault();
    const response = await fetch(process.env.AUTH + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        username: username,
      }),
    });
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("authToken", token);
      setToken(localStorage.getItem("authToken"));
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  useEffect(() => {
    if (token != undefined && token != null){
      if (me.placeholder == undefined) {
        router.push("/requests");
      }
      else fetchMe(token);
    }
  }, [me, token]);

  return (
    <div className={styles.page}>
      <main className={styles.loginmain}>
        <div className={styles.logina}>
          {activeForm === "login" ? <h1>Login</h1> : <h1>Register</h1>}

          {/* Buttons to Switch Forms */}
          <div>
            <button className={styles.normalbutton}
              onClick={() => {
                if (activeForm === "login") setActiveForm("register");
                else setActiveForm("login");
              }}
            >
              {activeForm === "login" ? "No account?" : "Already registered?"}
            </button>
          </div>

          {activeForm === "login" && (
            <form onSubmit={logEmIn}>
              <input className={styles.inputbig} 
                type="text"
                placeholder="Login..."
                value={username}
                onChange={handleLog}
              />
              <br />
              <input className={styles.inputbig} 
                type="password"
                placeholder="Password..."
                value={password}
                onChange={handlePass}
              />
              <br />
              {badpass ? "Wrong login on password!" : ""}
              <br />
              <button type="submit" className={styles.normalbutton}>get me in</button>
            </form>
          )}

          {activeForm === "register" && (
            <form onSubmit={regEmIn}>
              <input className={styles.inputbig} 
                type="text"
                placeholder="Username..."
                value={username}
                onChange={handleLog}
              />
              <br />
              <input className={styles.inputbig} 
                type="text"
                placeholder="Password..."
                value={password}
                onChange={handlePass}
              />
              <br />
              <button type="submit"  className={styles.normalbutton}>register me</button>
            </form>
          )}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
