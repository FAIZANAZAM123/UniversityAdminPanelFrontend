import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";

export default function Home() {
  const [show, setShow] = useState(false);
  const [questions,setQuestions]=useState("");

  useEffect(() => {
    setShow(true);
    if (Cookies.get("mode") == "light") {
      document.body.className = "light-mode";
    } else {
      document.body.className = "dark-mode";
    }

    async function getAdminDashboard() {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/v1/getQuestions`, {
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
          setQuestions(data.data.length);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    getAdminDashboard();
  }, []);

  return (
    <div className="siderow">
      <div className="sidecol1">
        <Sidebar />
      </div>
      <div className="sidecol2">
        <div className={`welcome-animation ${show ? "show" : ""}`}>
          <MDBRow style={{ margin: "5px", marginTop: "30px" }}>
            <h1
              className="dashboard"
              style={{
                textAlign: "left",
                paddingTop: "40px",
                fontWeight: "bolder",
              }}
            >
              Dashboard
            </h1>
            <MDBCol md="4">
              <MDBCard style={{ marginTop: "5px", borderRadius: 0 }} id="card">
                <MDBCardBody>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <MDBIcon
                        icon="question"
                        className="mr-2"
                        style={{ marginRight: "5px" }}
                      />
                      No of Questions
                    </div>
                    <h2>{questions}</h2>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    </div>
  );
}
