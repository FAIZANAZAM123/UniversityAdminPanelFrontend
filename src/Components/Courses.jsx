import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import axios from 'axios';
import { Card, Button, Row, Form, Col } from 'react-bootstrap';


export default function Courses() {
    const [show, setShow] = useState(false);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        setShow(true);
        getData();
        if (Cookies.get("mode") == "light") {
            document.body.className = "light-mode";
        } else {
            document.body.className = "dark-mode";
        }
    }, []);

    async function getData() {
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/v1/getScores`, {
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
                setScores(data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }



    // new code

    const [courseInfo, setCourseInfo] = useState({
        courseName: "",
        category: "",
        aboutCourse: "",
        relatedCourses: [""],
        whatYouLearn: [""],
        entryRequirements: [""],
        categoryImage: null
    });

    const handleChange = (field, value) => {
        setCourseInfo({ ...courseInfo, [field]: value });
    };

    const handleArrayChange = (field, index, value) => {
        const newArray = [...courseInfo[field]];
        newArray[index] = value;
        setCourseInfo({ ...courseInfo, [field]: newArray });
    };

    const handleAddField = (field) => {
        setCourseInfo({ ...courseInfo, [field]: [...courseInfo[field], ""] });
    };





    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(courseInfo);

        try {
            const formData = new FormData();

            // Append text data to the form data
            formData.append("courseName", courseInfo.courseName);
            formData.append("category", courseInfo.category);
            formData.append("aboutCourse", courseInfo.aboutCourse);

            // Append array data to the form data
            courseInfo.relatedCourses.forEach((relatedCourse, index) => {
                formData.append(`relatedCourses[${index}]`, relatedCourse);
            });

            courseInfo.whatYouLearn.forEach((learn, index) => {
                formData.append(`whatYouLearn[${index}]`, learn);
            });

            courseInfo.entryRequirements.forEach((entry, index) => {
                formData.append(`entryRequirements[${index}]`, entry);
            });

            // Append file data to the form data
            formData.append("categoryImage", courseInfo.categoryImage);
            console.log(formData);
            const response = await fetch("https://fresh-tropical-colony.glitch.me/addcourse", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                window.alert("Course saved successfully");
                console.log("Course saved successfully");
            } else {
                window.alert("Failed to save");
                console.error("Failed to save course");
            }
        } catch (error) {
            console.error("Error during save:", error);
        }
    };

    const handleCategoryImageChange = (e) => {
        const file = e.target.files[0];
        setCourseInfo({ ...courseInfo, categoryImage: file });
    };

    return (
        <div className="siderow">
            <div className="sidecol1">
                <Sidebar />
            </div>
            <div className="sidecol2">
                <div className={`welcome-animation ${show ? "show" : ""}`}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h1
                            className="dashboard"
                            style={{
                                textAlign: "left",
                                paddingTop: "40px",
                                fontWeight: "bolder",
                            }}
                        >
                            Edit Courses
                        </h1>
                    </div>

                    <div
                        class="relative overflow-x-auto shadow-md sm:rounded-lg"
                        style={{ borderRadius: 0, marginTop: "30px" }}
                    >




                        <Card border="light" className="cards  shadow-sm mb-4">
                            <Card.Body>
                                <h5 className="mb-4">Course Information</h5>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="courseName">
                                                 <Form.Label  className="lab">Course Name</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter the course name"
                                                    value={courseInfo.courseName}
                                                    onChange={(e) => handleChange("courseName", e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="category">
                                                 <Form.Label className="lab">Category</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter the category"
                                                    value={courseInfo.category}
                                                    onChange={(e) => handleChange("category", e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row className="align-items-center">

                                        <Col md={6} className="mb-3">
                                            <Form.Group id="categoryImage">
                                                 <Form.Label className="lab">Category Image</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="file"
                                                    onChange={handleCategoryImageChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="aboutCourse">
                                                 <Form.Label className="lab">About Course</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Provide information about the course"
                                                    value={courseInfo.aboutCourse}
                                                    onChange={(e) => handleChange("aboutCourse", e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="relatedCourses">
                                                 <Form.Label className="lab">Related Courses</Form.Label>
                                                {courseInfo.relatedCourses.map((relatedCourse, index) => (
                                                    <Form.Control
                                                        key={index}
                                                        className="mt-2"
                                                        type="text"
                                                        placeholder={`Enter related course #${index + 1}`}
                                                        value={relatedCourse}
                                                        onChange={(e) => handleArrayChange("relatedCourses", index, e.target.value)}
                                                    />
                                                ))}
                                                <Button className="mt-2" variant="primary" onClick={() => handleAddField("relatedCourses")}>Add Related Course</Button>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="whatYouLearn">
                                                 <Form.Label className="lab">What You'll Learn</Form.Label>
                                                {courseInfo.whatYouLearn.map((learn, index) => (
                                                    <Form.Control
                                                        key={index}
                                                        as="textarea"
                                                        className="mt-2"
                                                        rows={3}
                                                        placeholder={`Enter what students will learn #${index + 1}`}
                                                        value={learn}
                                                        onChange={(e) => handleArrayChange("whatYouLearn", index, e.target.value)}
                                                    />
                                                ))}
                                                <Button className="mt-2" variant="primary" onClick={() => handleAddField("whatYouLearn")}>Add What You'll Learn</Button>
                                            </Form.Group>
                                        </Col>





                                    </Row>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="entryRequirements">
                                                 <Form.Label className="lab">Entry Requirements</Form.Label>
                                                {courseInfo.entryRequirements.map((entry, index) => (
                                                    <Form.Control
                                                        key={index}
                                                        type="text"
                                                        className="mt-2"

                                                        placeholder={`Enter entry requirement #${index + 1}`}
                                                        value={entry}
                                                        onChange={(e) => handleArrayChange("entryRequirements", index, e.target.value)}
                                                    />
                                                ))}
                                                <Button
                                                    className="mt-2"
                                                    variant="primary" onClick={() => handleAddField("entryRequirements")}>Add Entry Requirement</Button>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <div className="mt-3">
                                        <Button variant="primary" onClick={handleSubmit} type="submit">Save Course</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>




                    </div>
                </div>
            </div>
        </div>
    );
}
