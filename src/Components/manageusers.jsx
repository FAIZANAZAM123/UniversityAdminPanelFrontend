import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";

export default function Manageusers() {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [id, setId] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  useEffect(() => {
    setShow(true);
    if (Cookies.get("mode") == "light") {
      document.body.className = "light-mode";
    } else {
      document.body.className = "dark-mode";
    }

    async function getLocations() {
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
          setData(data.data.map((item) => item.street));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    getData();
    getLocations();
  }, []);

  async function getData() {
    await fetch(`http://localhost:4000/getusers`, {
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
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete user?")) {
      await fetch(`http://localhost:4000/deleteuser?id=${id}`, {
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
          if (data.message == "deleted") {
            getData();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  async function handleUpdate(event) {
    event.preventDefault();
    setSubmit(true);
    await fetch(
      `http://localhost:4000/updateuser?id=${id}&email=${email}&location=${location}`,
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
        setBasicModal(false);
        if (data.message == "already") {
          document.getElementById("email-error").innerHTML =
            "EMAIL ALREADY EXIST";
          document.getElementById("email-error").style.color = "red";
          document.getElementById("email-error").style.display = "block";
        } else if (data.message == "updated") {
          getData();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
            Manage Users
          </h1>

          <div
            class="relative overflow-x-auto shadow-md sm:rounded-lg"
            style={{ borderRadius: 0, marginTop: "30px" }}
          >
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                class="uppercase"
                id="tablehead"
                style={{ padding: "10px", color: "#313a50" }}
              >
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Registered Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody id="tablebody">
                {users.map((user, index) => (
                  <tr class="border-b">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap "
                    >
                      {index + 1}
                    </th>
                    <td class="px-6 py-4">{user.street}</td>
                    <td class="px-6 py-4">{user.email}</td>
                    <td class="px-6 py-4">
                      {new Date(user.dated).toLocaleString()}
                    </td>
                    <td class="px-6 py-4">
                      <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          toggleShow();
                          setId(user.Id);
                          setEmail(user.email);
                          setLocation(user.street);
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          style={{ color: "green" }}
                        ></i>
                      </a>
                    </td>
                    <td class="px-6 py-4">
                      <a
                        href="#"
                        onClick={() => {
                          handleDelete(user.Id);
                        }}
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <i className="fa fa-trash" style={{ color: "red" }}></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog style={{ borderRadius: 0 }}>
          <MDBModalContent id="card">
            <MDBModalHeader>
              <MDBModalTitle>Update User</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleUpdate}>
              <MDBModalBody>
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
                    {data.map((location, index) => (
                      <option value={location}>{location}</option>
                    ))}
                  </select>
                  <span id="location-error"></span>
                </Form.Group>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn
                  type="submit"
                  className="btnsc"
                  style={{ borderRadius: 0 }}
                >
                  {submit ? (
                    <MDBSpinner color="info" />
                  ) : (
                    <span>Save Changes</span>
                  )}
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
