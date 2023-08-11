import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateUser = ({ component: Component, ...rest }) => {
  const [check, setCheck] = useState(true);
  const [valid, setValid] = useState();

  useEffect(() => {
    async function checker() {
      try {
        const response = await fetch(
          `http://localhost:4000/checkuuid?seshU=${Cookies.get("seshU")}`,
          {
            method: "GET",
            headers: {
              "api-key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Request failed.");
        }

        const data = await response.json();

        if (data.message === "user") {
          setCheck(false);
          setValid(true);
        } else if (data.message === "invalid") {
          setCheck(false);
          setValid(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    checker();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        check ? null : valid ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateUser;
