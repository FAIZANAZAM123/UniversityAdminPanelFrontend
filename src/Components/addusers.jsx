import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import { MDBCard, MDBCardBody, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";

export default function Addusers() {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setShow(true);
    if (Cookies.get("mode") == "light") {
      document.body.className = "light-mode";
    } else {
      document.body.className = "dark-mode";
    }

    async function getData() {
      await fetch(`http://localhost:4000/getlocations`, {
        method: "GET",
        headers: {
          "api-key": process.env.REACT_APP_API_KEY,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed.");
          }
          return response.json();
        })
        .then((data) => {
          setLocations(data.data.map((item) => item.street));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    getData();
  }, []);

  const handleusers = async (event) => {
    event.preventDefault();
    if (location == "") {
      document.getElementById("location-error").innerHTML =
        "LOCATION IS REQUIRED";
      document.getElementById("location-error").style.color = "red";
      document.getElementById("location-error").style.display = "block";
    } else {
      document.getElementById("location-error").style.display = "none";
      setSubmit(true);
      await fetch(
        `http://localhost:4000/adduser?location=${location}&email=${email}`,
        {
          method: "GET",
          headers: {
            "api-key": process.env.REACT_APP_API_KEY,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed.");
          }
          return response.json();
        })
        .then((data) => {
          setSubmit(false);
          if (data.message == "already") {
            document.getElementById("email-error").innerHTML =
              "EMAIL ALREADY EXIST";
            document.getElementById("email-error").style.color = "red";
            document.getElementById("email-error").style.display = "block";
          } else if (data.message == "incorrect") {
            document.getElementById("email-error").innerHTML =
              "EMAIL IS INVALID";
            document.getElementById("email-error").style.color = "red";
            document.getElementById("email-error").style.display = "block";
          } else if (data.message == "added") {
            setEmail("");
            setLocation("");
            setSuccess(true);
            setTimeout(function () {
              setSuccess(false);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="siderow">
      <div className="sidecol1">
        <Sidebar />
      </div>
      <div className="sidecol2">
        <div className={`welcome-animation ${show ? "show" : ""}`}>
          <h1
            className="dashboard"
            style={{
              textAlign: "left",
              paddingTop: "40px",
              fontWeight: "bolder",
            }}
          >
            Add Users
          </h1>
          <MDBCard
            style={{ borderRadius: 0, marginTop: "40px", margin: "5px" }}
            id="card"
          >
            <h4
              id="cardhead"
              style={{ textAlign: "left", padding: "15px", fontWeight: "bold" }}
            >
              Users
            </h4>
            <form onSubmit={handleusers}>
              <MDBCardBody style={{ textAlign: "left" }}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    size="lg"
                    id="card"
                    value={email}
                    onChange={handleEmail}
                    required
                    style={{ borderRadius: 0, color: "black" }}
                  />
                  <span id="email-error"></span>
                </Form.Group>
                <Form.Group className="mb-3">
                  <select
                    className="form-control form-control-lg"
                    id="card"
                    value={location}
                    onChange={handleLocation}
                    style={{ borderRadius: 0, color: "black" }}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      style={{ color: "#6f6f70" }}
                    >
                      Select Location
                    </option>
                    {locations.map((location, index) => (
                      <option value={location}>{location}</option>
                    ))}
                  </select>
                  <span id="location-error"></span>
                </Form.Group>
                <MDBBtn
                  type="submit"
                  style={{
                    width: "100%",
                    borderRadius: 0,
                    backgroundColor: success ? "green" : "",
                    color: success ? "white" : "",
                  }}
                  className="btnsc"
                >
                  {submit ? (
                    <MDBSpinner color="info" />
                  ) : success ? (
                    <span>Added</span>
                  ) : (
                    <span>Add User</span>
                  )}
                </MDBBtn>
              </MDBCardBody>
            </form>
          </MDBCard>
        </div>
      </div>
    </div>
  );
}
