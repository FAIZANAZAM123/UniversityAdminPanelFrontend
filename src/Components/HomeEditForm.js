import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBSpinner,
} from "mdb-react-ui-kit";

import { Card, Button, Row, Col } from 'react-bootstrap';

import Form from "react-bootstrap/Form";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from "js-cookie";
import { saveLogs } from './logs';

function HomeEditForm() {



    const [videoFile, setVideoFile] = useState(null);

    const handleFileChange = (event) => {
        setVideoFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("videoFile", videoFile);

            const response = await fetch("https://fresh-tropical-colony.glitch.me/edithomevideo", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error uploading home video: ${response.statusText}`);
            } else {
                window.alert("Video Uploaded");
            }

            return await response.json();
        } catch (error) {
            console.error("Error uploading home video:", error);
            throw error;
        }
    };


    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [subtitle, setSubtitle] = useState('');
    const [paragraph, setParagraph] = useState('');


    const [title1, setTitle1] = useState('');
    const [file1, setFile1] = useState(null);
    const [subtitle1, setSubtitle1] = useState('');
    const [paragraph1, setParagraph1] = useState('');

    const [Quote, setQuote] = useState('');
    const [file2, setFile2] = useState(null);
    const [Description, setDescription] = useState('');

    const [Quote1, setQuote1] = useState('');
    const [file3, setFile3] = useState(null);
    const [Description1, setDescription1] = useState('');

    const [title2, setTitle2] = useState('');


    const [submit, setsubmit] = useState(false);
    const [valid, setvalid] = useState(false);


    const [description, setdescription] = useState('');

    const [VideoLink, setvideoLink] = useState('');

    const handleImageChange = (e) => {
        setFile(e.target.files[0]);







    };

    const handleImageChange1 = (e) => {
        setFile1(e.target.files[0]);

    };
    const handleImageChange2 = (e) => {
        setFile2(e.target.files[0]);

    };


    const handleImageChange3 = (e) => {
        setFile3(e.target.files[0]);

    };

    const handleSubmit1 = async (e) => {

        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('Image', file);
            formData.append('subtitle', subtitle);
            formData.append('paragraph', paragraph);


            const response = await fetch('https://fresh-tropical-colony.glitch.me/addScholar', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                window.alert('Added Successfully');
                console.log(data.message); // Log success message
                // Reset form fields or redirect to another page as needed
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleSubmit2 = async (e) => {

        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title1', title1);
            formData.append('Image', file1);
            formData.append('subtitle1', subtitle1);
            formData.append('paragraph1', paragraph1);


            const response = await fetch('https://fresh-tropical-colony.glitch.me/addcampuslife', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log success message
                window.alert('added successfully');
                // Reset form fields or redirect to another page as needed
            }
        } catch (error) {

            window.alert(error)
            console.error('Error:', error);
        }
    };

    const handleSubmit3 = async (e) => {

        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('Quote', Quote);
            formData.append('Image', file2);
            formData.append('Description', Description);
            formData.append('name', namee);


            const response = await fetch('https://fresh-tropical-colony.glitch.me/addgraduate', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log success message
                window.alert('added successfully');
                // Reset form fields or redirect to another page as needed
            }
        } catch (error) {

            window.alert(error)
            console.error('Error:', error);
        }
    };


    const handleSubmit4 = async (e) => {

        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('Quote', Quote1);
            formData.append('Image', file3);
            formData.append('Description', Description1);
            formData.append('name', namee2);



            const response = await fetch('https://fresh-tropical-colony.glitch.me/addEducator', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log success message
                window.alert('added successfully');
                // Reset form fields or redirect to another page as needed
            }
        } catch (error) {

            window.alert(error)
            console.error('Error:', error);
        }
    };



    const handleSubmit5 = async () => {
        try {
            const response = await fetch('https://fresh-tropical-colony.glitch.me/internationaloffice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoLink: VideoLink, description, title: title2 }),
            });

            if (!response.ok) {
                throw new Error(`Error updating home video link: ${response.statusText}`);
            }
            else {
                window.alert('Data Updated');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating Data:', error);
            throw error;
        }
    };


    const [namee, setname] = useState();
    const [namee2, setname2] = useState();

    const [images, setImages] = useState([]);
    const [description3, setdescription3] = useState('');
    const [title4, setTitle4] = useState('');

    const handleImageChange4 = (event) => {
        const files = event.target.files;
        setImages([...images, ...files]);
    };


    const handleSubmit6 = async (e) => {

        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title4);
            for (let i = 0; i < images.length; i++) {
                console.log(images);
                formData.append('images', images[i]);
            } formData.append('description', description3);


            const response = await fetch('https://fresh-tropical-colony.glitch.me/addpartners', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log success message
                window.alert('added successfully');
                // Reset form fields or redirect to another page as needed
            }
        } catch (error) {

            window.alert(error)
            console.error('Error:', error);
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
                                    <form >
                                        <center>
                                            <img
                                                src="./Assets/logo.png"
                                                alt="Sushi"
                                                style={{
                                                    width: "180px",
                                                    borderRadius: "50%",
                                                    height: "150px",
                                                }}
                                            />
                                        </center>
                                        <h4 style={{ marginTop: "10px", marginBottom: "30px" }}>
                                            Login
                                        </h4>


                                        <Card border="light" className="bg-white shadow-sm mb-4">
                                            <Card.Body>
                                                <h5 className="mb-4">Edit Home Video</h5>
                                                <Form onSubmit={handleSubmit}>
                                                    <Row className="mb-3">
                                                        <Col md={6}>
                                                            <Form.Group controlId="videoFile">
                                                                <Form.Label>Upload Video File</Form.Label>
                                                                <Form.Control
                                                                    onChange={handleFileChange}
                                                                    required
                                                                    type="file"
                                                                    accept="video/*"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <div className="mt-3">
                                                        <Button onClick={handleSubmit} variant="primary" type="submit">
                                                            Update
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Card.Body>
                                        </Card>



                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="email"
                                                placeholder="Email"
                                                size="lg"

                                                style={{ borderRadius: 0 }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                size="lg"


                                                style={{ borderRadius: 0 }}
                                            />
                                        </Form.Group>
                                        <MDBBtn
                                            type="submit"
                                            size="lg"
                                            style={{
                                                borderRadius: 0,
                                                width: "100%",
                                                backgroundColor: valid ? "red" : "",
                                            }}
                                            className="btnsc"
                                        >
                                            {submit ? (
                                                <MDBSpinner color="info" />
                                            ) : valid ? (
                                                <span>Incorrect Login</span>
                                            ) : (
                                                <span>Login</span>
                                            )}
                                        </MDBBtn>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            <footer className="footer">
                <p>
                    &copy; {new Date().getFullYear()} Guess Game. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default HomeEditForm;
