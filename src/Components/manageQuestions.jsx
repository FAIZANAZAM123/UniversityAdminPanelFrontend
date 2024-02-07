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
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main functional component
export default function ManageQuestions() {
  // Question
  const [file,setFile]=useState(null);
  const [option1,setOption1]=useState("");
  const [option2,setOption2]=useState("");
  const [correct,setCorrect]=useState("");
  // State variables
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [id, setId] = useState("");
  const [updateModal,setUpdateModal]=useState(false);
  const [basicModal, setBasicModal] = useState(false);

  // Update
  const [fileU,setFileU]=useState(null);
  const [optionU1,setOptionU1]=useState("");
  const [optionU2,setOptionU2]=useState("");
  const [correctU,setCorrectU]=useState("");

  // Toggle functions for showing/hiding modals
  const toggleShow = () => setBasicModal(!basicModal);
  const toggleUpdate = () => setUpdateModal(!updateModal);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    setShow(true);
    if (Cookies.get("mode") === "light") {
      document.body.className = "light-mode";
    } else {
      document.body.className = "dark-mode";
    }
    getData();
  }, []);

  // Function to fetch user data from the server
  async function getData() {
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
        setQuestions(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Function to handle user deletion
  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete Question?")) {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/v1/deleteQuestions?id=${id}`, {
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
          if (data.message === "deleted") {
            getData();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  // Function to handle user update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmit(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/v1/updateQuestions?id=${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
          "api-key": process.env.REACT_APP_API_KEY,
        },
      });

      form.reset();
      const responseData = response.data;
      if(responseData.message === "updated"){
        setSubmit(false);
        setUpdateModal(false); 
        getData();
      }
    } catch (error) {
      console.error('Error:', error.message);
      setSubmit(false);
    }
  };

  // Function to handle user addition
  const handleAdd = async (e) => {
    e.preventDefault();
    setSubmit(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/v1/addQuestions`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
          "api-key": process.env.REACT_APP_API_KEY,
        },
      });
      setSubmit(true);
      const responseData = response.data;
      if(responseData.message === "added"){
        setSubmit(false);
        getData();
        setBasicModal(false);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setSubmit(false);
    }
  };

  // JSX rendering
  return (
    <div className="siderow">
      <div className="sidecol1">
        <Sidebar />
      </div>
      <div className="sidecol2">
      <ToastContainer />
        <div className={`welcome-animation ${show ? "show" : ""}`}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <h1
              className="dashboard"
              style={{
                textAlign: "left",
                paddingTop: "40px",
                fontWeight: "bolder",
              }}
            >
              Manage Questions
            </h1>
            <MDBBtn style={{height:"50px",marginTop:"3%",backgroundColor:'#e8eaf1',color:"#313a50",borderRadius:"0"}} onClick={()=>{setBasicModal(true)}}>Add Questions</MDBBtn>
          </div>
          <MDBRow className='row-cols-1 row-cols-md-4 g-4' style={{margin:"20px"}}>
            {questions.map((item,index)=>(
              <MDBCol key={index}>
                <MDBCard className='h-100' style={{borderRadius:"0"}} id="card">
                  <center>
                    <MDBCardImage
                      src={`${process.env.REACT_APP_BASE_URL}/images/${item.image}`}
                      position='top'
                      style={{borderRadius:"0",height:"200px",width:"200px",padding:"10px"}}
                    />
                  </center>
                  <MDBCardBody>
                    <MDBCardTitle style={{fontSize:"18px"}}>Correct: {item.correct}</MDBCardTitle>
                    <MDBCardText>
                      Option 1: {item.option1}
                      <br />
                      Option 2: {item.option2}
                    </MDBCardText>
                    <MDBBtn style={{height:"40px",backgroundColor:'#e8eaf1',color:"#313a50",borderRadius:"0",backgroundColor:"green",color:"white"}} onClick={()=>{
                      setId(item.Id);
                      setOptionU1(item.option1);
                      setOptionU2(item.option2);
                      setCorrectU(item.correct);
                      setUpdateModal(true);
                    }}>Update</MDBBtn>
                    <MDBBtn style={{height:"40px",backgroundColor:'#e8eaf1',color:"#313a50",borderRadius:"0",backgroundColor:"red",color:"white",marginLeft:'5px'}} onClick={()=>{
                      handleDelete(item.Id)
                    }}>Delete</MDBBtn>
                  </MDBCardBody>
                  <MDBCardFooter>
                    Created At: {new Date(item.dated).toLocaleString()}
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </div>
      </div>

      {/* Modal for adding a user */}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog style={{ borderRadius: 0 }}>
          <MDBModalContent id="card">
            <MDBModalHeader>
              <MDBModalTitle>Add Question</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleAdd}>
              <MDBModalBody>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="file"
                    size="lg"
                    id="card"
                    value={file}
                    onChange={(e)=>{setFile(e.target.value)}}
                    name="image"
                    required
                    style={{ borderRadius: 0, color: "black" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Option 1"
                    size="lg"
                    id="card"
                    value={option1}
                    onChange={(e)=>{setOption1(e.target.value)}}
                    name="option1"
                    required
                    style={{ borderRadius: 0, color: "black" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Option 2"
                    name="option2"
                    size="lg"
                    value={option2}
                    onChange={(e)=>{setOption2(e.target.value)}}
                    id="card"
                    required
                    style={{ borderRadius: 0, color: "black" }}
                  />
                </Form.Group>
                <select class="form-select" id="card" aria-label="Default select example" name="correct" style={{color:"black"}} value={(correct)} onChange={(e)=>{setCorrect(e.target.value)}}>
                  <option selected style={{color:"black"}}>Choose Correct Option</option>
                  {option1!=""?(
                    <option value={option1} style={{color:"black"}}>{option1}</option>
                  ):("")}
                  {option2!=""?(
                    <option value={option2} style={{color:"black"}}>{option2}</option>
                  ):("")}
                </select>
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
                    <span>Add Questions</span>
                  )}
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* Modal for updating a user */}
      <MDBModal show={updateModal} setShow={setUpdateModal} tabIndex="-1">
        <MDBModalDialog style={{ borderRadius: 0 }}>
          <MDBModalContent id="card">
            <MDBModalHeader>
              <MDBModalTitle>Update User</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleUpdate}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleUpdate}>
              <MDBModalBody>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="file"
                    size="lg"
                    id="card"
                    name="image"
                    style={{ borderRadius: 0, color: "black" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Option 1"
                    size="lg"
                    id="card"
                    name="option1"
                    value={optionU1}
                    onChange={(e)=>{setOptionU1(e.target.value)}}
                    required
                    style={{ borderRadius: 0, color: "black" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Option 2"
                    name="option2"
                    size="lg"
                    id="card"
                    value={optionU2}
                    onChange={(e)=>{setOptionU2(e.target.value)}}
                    required
                    style={{ borderRadius: 0, color: "black" }}
                  />
                </Form.Group>
                <select class="form-select" id="card" aria-label="Default select example" name="correct" style={{color:"black"}} value={(correctU)} onChange={(e)=>{setCorrectU(e.target.value)}}>
                  <option selected style={{color:"black"}}>Choose Correct Option</option>
                  {optionU1!=""?(
                    <option value={optionU1} style={{color:"black"}}>{optionU1}</option>
                  ):("")}
                  {optionU2!=""?(
                    <option value={optionU2} style={{color:"black"}}>{optionU2}</option>
                  ):("")}
                </select>
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
                    <span>Update Question</span>
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
