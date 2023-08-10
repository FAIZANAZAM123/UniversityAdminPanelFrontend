import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBBtn,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";

export default function Addlocation() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    if (Cookies.get("mode") === "false") {
      document.body.className = "light-mode";
    } else {
      document.body.className = "dark-mode";
    }
  }, []);

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
            Add Location
          </h1>
          <MDBCard style={{ borderRadius: 0, marginTop: "40px" }} id="card">
            <h4
              id="cardhead"
              style={{ textAlign: "left", padding: "15px", fontWeight: "bold" }}
            >
              Location
            </h4>
            <MDBCardBody style={{ textAlign: "left" }}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="1234 Alpenstrasse, 3012 Bern, Switzerland"
                  size="lg"
                  id="card"
                  style={{ borderRadius: 0, color: "black" }}
                />
              </Form.Group>
              <MDBBtn
                style={{ width: "100%", borderRadius: 0 }}
                className="btnsc"
              >
                Add
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>
  );
}
