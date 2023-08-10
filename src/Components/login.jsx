import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Sidebar from "./sidebar";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
    if (event.target.value.length == 0) {
      event.target.style.backgroundColor = "#f6eacf";
      event.target.style.border = "1px solid #daa93e";
    } else {
      event.target.style.backgroundColor = "#d1e4df";
      event.target.style.border = "1px solid #579c89";
    }
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length == 0) {
      event.target.style.backgroundColor = "#f6eacf";
      event.target.style.border = "1px solid #daa93e";
    } else {
      event.target.style.backgroundColor = "#d1e4df";
      event.target.style.border = "1px solid #579c89";
    }
  };

  return (
    <div>
      <div className="login-container">
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="my-5 mx-auto"
                id="card"
                style={{ borderRadius: 0, maxWidth: "400px" }}
              >
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
                  <center>
                    <img
                      src="./Assets/sushi.jpg"
                      alt="Sushi"
                      style={{
                        width: "180px",
                        borderRadius: "50%",
                        height: "180px",
                      }}
                    />
                  </center>
                  <h4 style={{ marginTop: "10px", marginBottom: "30px" }}>
                    Login
                  </h4>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      size="lg"
                      value={email}
                      onChange={handleEmail}
                      style={{ borderRadius: 0 }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      size="lg"
                      value={password}
                      onChange={handlePassword}
                      style={{ borderRadius: 0 }}
                    />
                  </Form.Group>
                  <MDBBtn
                    size="lg"
                    style={{ borderRadius: 0 }}
                    className="btnsc"
                  >
                    Login
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Sushi Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Login;
