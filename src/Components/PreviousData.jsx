import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import axios from 'axios';
import { Card, Button, Row, Form, Col, Container, Modal } from 'react-bootstrap';


export default function PreviousData() {
    const [previousVideos, setPreviousVideos] = useState();
    const [graduates, setgraduates] = useState([]);
    const [educators, seteducators] = useState([]);
    const [Loading, setloading] = useState(false);
    const [scholar, setscholar] = useState([]);
    const [campus, setcampus] = useState([]);

    const [partners, setpartners] = useState([]);

    useEffect(() => {
        if (Cookies.get("mode") == "light") {
          document.body.className = "light-mode";
        } else {
          document.body.className = "dark-mode";
        }
      }, []);
    useEffect(() => {
        const fetchPreviousVideos = async () => {
            try {
                // Fetch previous video data from your route
                const response = await fetch('https://three-root-arthropod.glitch.me/gethomevideo');
                if (!response.ok) {
                    throw new Error('Failed to fetch previous videos');
                }
                const data = await response.json();
                console.log(data.homeVideo.videoLink);
                setPreviousVideos(data.homeVideo.videoLink);
            } catch (error) {
                console.error('Error fetching previous videos:', error);
            }
        };

        const fetchgraduates = async () => {
            try {
                // Fetch previous video data from your route
                const response = await fetch('https://three-root-arthropod.glitch.me/getgraduate');
                if (!response.ok) {
                    throw new Error('Failed to fetch previous videos');
                }
                const data = await response.json();
                console.log(data);

                if (!data.graduates) {
                    throw new Error('Graduates data not found in response');
                }
                setgraduates(data.graduates);

            } catch (error) {
                console.error('Error fetching previous videos:', error);
            }
        };


        const fetcheducators = async () => {
            try {
                // Fetch previous video data from your route
                const response = await fetch('https://three-root-arthropod.glitch.me/geteducator');
                if (!response.ok) {
                    throw new Error('Failed to fetch previous videos');
                }
                const data = await response.json();
                console.log(data);
                if (!data.educators) {
                    throw new Error('Graduates data not found in response');
                }
                seteducators(data.educators);

            } catch (error) {
                console.error('Error fetching previous videos:', error);
            }
        };

        const fetchpartners = async () => {
            try {
                // Fetch previous video data from your route
                const response = await fetch('https://three-root-arthropod.glitch.me/getpartners');
                if (!response.ok) {
                    throw new Error('Failed to fetch previous videos');
                }
                const data = await response.json();
                console.log(data, 'partners');

                if (!data.partners) {
                    throw new Error('Graduates data not found in response');
                }
                setpartners(data.partners);

            } catch (error) {
                console.error('Error fetching previous videos:', error);
            }
        };



        const fetchsholars = async () => {
            try {
                // Fetch previous video data from your route
                const response = await fetch('https://three-root-arthropod.glitch.me/getScholar');
                if (!response.ok) {
                    throw new Error('Failed to fetch previous videos');
                }
                const data = await response.json();
                console.log(data);

                if (!data.scholarship) {
                    throw new Error('Graduates data not found in response');
                }
                setscholar(data.scholarship);

            } catch (error) {
                console.error('Error fetching previous videos:', error);
            }
        };

        const fetchcampus = async () => {
            try {
                // Fetch previous video data from your route
                const response = await fetch('https://three-root-arthropod.glitch.me/getcampuslife');
                if (!response.ok) {
                    throw new Error('Failed to fetch previous videos');
                }
                const data = await response.json();
                console.log(data);
                if (!data.campusLife) {
                    throw new Error('Graduates data not found in response');
                }
                setcampus(data.campusLife);

            } catch (error) {
                console.error('Error fetching previous videos:', error);
            }
        };

        fetchPreviousVideos();
        fetchgraduates();
        fetchpartners()
        fetchsholars();
        fetchcampus();
        fetcheducators();
    }, []);


    const [editingGraduate, setEditingGraduate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        Quote: '',
        Description: '',
        name: '',
        image: null,
    });


    const [editingEducator, setEditingEducator] = useState(null);
    const [showModal1, setShowModal1] = useState(false);
    const [formData1, setFormData1] = useState({
        Quote: '',
        Description: '',
        name: '',
        image: null,
    });




    const handleUpdateClick = (graduate) => {
        setEditingGraduate(graduate);
        setFormData({
            Quote: graduate.Quote,
            Description: graduate.Description,
            name: graduate.Name,
            image: null, // Reset the image in form data
        });
        setShowModal(true);
    };


    const handleUpdateClick1 = (educator) => {
        setEditingEducator(educator);
        setFormData1({
            Quote: educator.Quote,
            Description: educator.Description,
            name: educator.Name,
            image: null, // Reset the image in form data
        });
        setShowModal1(true);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log(formData);
        try {
            const data = new FormData();
            data.append('Quote', formData.Quote);
            data.append('Description', formData.Description); // Make sure this is not null
            data.append('name', formData.name); // Make sure this is not null
            if (formData.image) {
                data.append('image', formData.image);
            }

            // Send a request to update the graduate's details
            const response = await fetch(`https://three-root-arthropod.glitch.me/graduates/${editingGraduate._id}`, {
                method: 'put',
                body: data,
            });

            if (response.ok) {
                const updatedGraduate = await response.json();
                console.log('Graduate updated successfully:', updatedGraduate);
                setShowModal(false);
                setEditingGraduate(null);

                window.location.reload();

            } else {
                console.error('Failed to update graduate');
            }
        } catch (error) {
            console.error('Error updating graduate:', error);
        }
    };




    const handleFormSubmit1 = async (event) => {
        event.preventDefault();

        console.log(formData1, 'eewew');
        try {
            const data = new FormData();
            data.append('Quote', formData1.Quote);
            data.append('Description', formData1.Description); // Make sure this is not null
            data.append('name', formData1.name); // Make sure this is not null
            if (formData1.image) {


                data.append('image', formData1.image);
            }

            // Send a request to update the graduate's details
            const response = await fetch(`https://three-root-arthropod.glitch.me/educator/${editingEducator._id}`, {
                method: 'put',
                body: data,
            });

            if (response.ok) {
                const updatedEducator = await response.json();
                console.log('Graduate updated successfully:', updatedEducator);
                setShowModal1(false);
                setEditingEducator(null);

                window.location.reload();

            } else {
                console.error('Failed to update educator');
            }
        } catch (error) {
            console.error('Error updating educator:', error);
        }
    };

    const handleImageChange = (event) => {
        setFormData({ ...formData, image: event.target.files[0] });
    };

    const handleImageChange1 = (event) => {
        setFormData1({ ...formData1, image: event.target.files[0] });
    };




    const [showModal2, setShowModal2] = useState(false);
    const [formData2, setFormData2] = useState({
        title:  partners.title || '',
        description: partners.description || '',
        image: null,
        oldImageUrl: ''
    });


    const handleUpdateClick3 = (image) => {
        setFormData2({
            ...formData2,
            oldImageUrl: image
        });
        setShowModal2(true);
    };
    const handleFormSubmit2 = async (event) => {
        event.preventDefault();

        try {
            const data = new FormData();
            data.append('title', formData2.title);
            data.append('description', formData2.description);

            data.append('oldImageUrl', formData2.oldImageUrl);



            if (formData2.image) {
                data.append('image', formData2.image);
            }


            console.log(formData2);
            const response = await fetch(`https://three-root-arthropod.glitch.me/addpartners/${partners._id}`, {
                method: 'PUT',
                body: data,
            });

            if (response.ok) {
                const updatedPartner = await response.json();
                console.log('Partner updated successfully:', updatedPartner);
                setShowModal2(false);
                window.location.reload();
            } else {
                console.error('Failed to update partner');
            }
        } catch (error) {
            console.error('Error updating partner:', error);
        }
    };

    const handleImageChange2 = (event) => {
        setFormData2({ ...formData2, image: event.target.files[0] });
    };

    const [videoFile, setVideoFile] = useState(null);

    const handleFileChange = (event) => {
        setVideoFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {

        console.log('co')
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("videoFile", videoFile);

            const response = await fetch("https://three-root-arthropod.glitch.me/edithomevideo", {
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
            window.alert(error);
            console.error("Error uploading home video:", error);
            throw error;
        }
    };



    // Scholarships


    const [showModal4, setShowModal4] = useState(false);

    const [editingScholar, setEditingScholar] = useState(false);

    const [formData4, setFormData4] = useState({
        title: '',
        description: '',
        image: null,
    });


    const handleUpdateClick4 = (scholar) => {
        setEditingScholar(scholar);
        setFormData4({
            title: scholar.title,
            subtitle: scholar.subtitle,
            image: null,
        });
        setShowModal4(true);
    };
    const handleFormSubmit4 = async (event) => {
        event.preventDefault();

        try {
            const data = new FormData();
            data.append('title', formData4.title);
            data.append('subtitle', formData4.subtitle);




            if (formData4.image) {
                data.append('image', formData4.image);
            }


            console.log(formData4);
            const response = await fetch(`https://three-root-arthropod.glitch.me/editscholar/${editingScholar._id}`, {
                method: 'PUT',
                body: data,
            });

            if (response.ok) {
                const updatedScholar = await response.json();
                console.log('Partner updated successfully:', updatedScholar);
                setShowModal4(false);
                setEditingScholar(null);

                window.location.reload();
            } else {
                console.error('Failed to update scholar');
            }
        } catch (error) {
            console.error('Error  updating Scholar:', error);
        }
    };

    const handleImageChange4 = (event) => {
        setFormData4({ ...formData4, image: event.target.files[0] });
    };








    const [showModal5, setShowModal5] = useState(false);

    const [editingCampus, setEditingCampus] = useState(false);

    const [formData5, setFormData5] = useState({
        title: '',
        subtitle: '',
        image: null,
    });


    const handleUpdateClick5 = (campus) => {
        setEditingCampus(campus);
        setFormData5({
            title: campus.title1,
            subtitle: campus.subtitle1,
            image: null,
        });
        setShowModal5(true);
    };
    const handleFormSubmit5 = async (event) => {
        event.preventDefault();

        try {
            const data = new FormData();
            data.append('title1', formData5.title);
            data.append('subtitle1', formData5.subtitle);




            if (formData5.image) {
                data.append('image', formData5.image);
            }


            console.log(formData5);
            const response = await fetch(`https://three-root-arthropod.glitch.me/editcampus/${editingCampus._id}`, {
                method: 'PUT',
                body: data,
            });

            if (response.ok) {
                const editingCampus = await response.json();
                console.log('Partner updated successfully:', editingCampus);
                setShowModal5(false);
                setEditingScholar(null);

                window.location.reload();
            } else {
                console.error('Failed to update editingCampus');
            }
        } catch (error) {
            console.error('Error  updating editingCampus:', error);
        }
    };

    const handleImageChange5 = (event) => {
        setFormData5({ ...formData5, image: event.target.files[0] });
    };








    return (

        <>
            <div className="">
                <div className="sidecol1">
                    <Sidebar />
                </div>

                <Container>
                    <h2 className="mt-3 mb-3">Previous Home Video</h2>
                    {previousVideos === '' ? (
                        <p>No previous videos available.</p>
                    ) : (
                        <Row className="justify-center mx-auto">
                            <Col className="ms-auto">
                                <video  className="videos mx-auto" src={`https://three-root-arthropod.glitch.me/${previousVideos}`}  height="300" controls autoPlay loop />
                            </Col>
                        </Row>
                    )}

                    <Card border="light" className=" cards mt-2   shadow-sm mb-4">
                        <Card.Body>
                            <h5 className="mb-4">Edit Home Video</h5>
                            <Form >
                                <Row className="mb-3 justify-center">
                                    <Col md={6}>
                                        <Form.Group controlId="videoFile">
                                            <Form.Label  className="ondark">Upload Video File</Form.Label>
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
                                    <Button onClick={handleSubmit} variant="light" type="submit">
                                        Update
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                </Container>


                <Container>
                    <h2 className="mt-5 text-center">Scholorships</h2>
                    <Row xs={1} md={2} lg={4} className="g-4 ">
                        {scholar && scholar.map((scholar) => (
                            <Col key={scholar._id}>
                                <Card className="h-100 shadow">
                                    <Card.Img variant="top" src={`https://three-root-arthropod.glitch.me/${scholar.Image}`} style={{ height: '250px' }} className="graduate-img  w-100" />
                                    <Card.Body className="cards">
                                        <Card.Title>{scholar.title}</Card.Title>
                                        <Card.Text>{scholar.subtitle}</Card.Text>
                                        <Button variant="light" onClick={() => handleUpdateClick4(scholar)}>Update</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Modal show={showModal4} onHide={() => setShowModal4(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title >Edit Scholarship</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleFormSubmit4}>
                                <Form.Group className="mb-3" controlId="quote">
                                    <Form.Label className="chang">Title</Form.Label>
                                    <Form.Control type="text" value={formData4.title} onChange={(e) => setFormData4({ ...formData4, title: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label className="chang">Subtitle</Form.Label>
                                    <Form.Control type="text" value={formData4.subtitle} onChange={(e) => setFormData4({ ...formData4, subtitle: e.target.value })} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className="chang">Image</Form.Label>
                                    <Form.Control type="file" onChange={handleImageChange4} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Container>

                {/* Campus Life
             */}
                <Container>
                    <h2 className="mt-5 text-center">Campus Life</h2>
                    <Row xs={1} md={2} lg={4} className="g-4 ">
                        {campus && campus.map((campus) => (
                            <Col key={campus._id}>
                                <Card className="h-100 shadow">
                                    <Card.Img variant="top" src={`https://three-root-arthropod.glitch.me/${campus.Image}`} style={{ height: '250px' }} className="graduate-img  w-100" />
                                    <Card.Body className="cards">
                                        <Card.Title>{campus.title1}</Card.Title>
                                        <Card.Text>{campus.subtitle1}</Card.Text>
                                        <Button variant="light" onClick={() => handleUpdateClick5(campus)}>Update</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Modal show={showModal5} onHide={() => setShowModal5(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title >Edit Campus Life</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleFormSubmit5}>
                                <Form.Group className="mb-3" controlId="quote">
                                    <Form.Label className="chang">Title</Form.Label>
                                    <Form.Control type="text" value={formData5.title} onChange={(e) => setFormData5({ ...formData5, title: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label className="chang">Subtitle</Form.Label>
                                    <Form.Control type="text" value={formData5.subtitle} onChange={(e) => setFormData5({ ...formData5, subtitle: e.target.value })} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className="chang">Image</Form.Label>
                                    <Form.Control type="file" onChange={handleImageChange5} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Container>

                <Container>
                    <h2 className="mt-5 text-center">Graduates</h2>
                    <Row xs={1} md={2} lg={4} className="g-4 ">
                        {graduates && graduates.map((graduate) => (
                            <Col key={graduate._id}>
                                <Card className="h-100 shadow">
                                    <Card.Img variant="top" src={`https://three-root-arthropod.glitch.me/${graduate.Image}`} style={{ height: '250px' }} className="graduate-img  w-100" />
                                    <Card.Body className="cards">
                                        <Card.Title>{graduate.Name}</Card.Title>
                                        <Card.Text>{graduate.Description}</Card.Text>
                                        <Card.Text>{graduate.Quote}</Card.Text>
                                        <Button variant="light" onClick={() => handleUpdateClick(graduate)}>Update</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title >Edit Graduate</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group className="mb-3" controlId="quote">
                                    <Form.Label className="chang">Quote</Form.Label>
                                    <Form.Control type="text" value={formData.Quote} onChange={(e) => setFormData({ ...formData, Quote: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label className="chang">Description</Form.Label>
                                    <Form.Control type="text" value={formData.Description} onChange={(e) => setFormData({ ...formData, Description: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label className="chang">Name</Form.Label>
                                    <Form.Control type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className="chang">Image</Form.Label>
                                    <Form.Control type="file" onChange={handleImageChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Container>


                <Container>
                    <h2 className="mt-5 text-center">Educators</h2>
                    <Row xs={1} md={2} lg={4} className="g-4 ">
                        {educators && Array.isArray(educators) && educators.map((educators) => (
                            <Col key={educators._id}>
                                <Card className="h-100 cards shadow">
                                    <Card.Img variant="top" src={`https://three-root-arthropod.glitch.me/${educators.Image}`} style={{ height: '250px' }} className="graduate-img  w-100" />
                                    <Card.Body>
                                        <Card.Title>{educators.Name}</Card.Title>
                                        <Card.Text>{educators.Description}</Card.Text>
                                        <Card.Text>{educators.Quote}</Card.Text>

                                        <Button variant="light" onClick={() => handleUpdateClick1(educators)}>Update</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>


                    <Modal show={showModal1} onHide={() => setShowModal1(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Educator</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleFormSubmit1}>
                                <Form.Group className="mb-3" controlId="quote">
                                    <Form.Label className="chang">Quote</Form.Label>
                                    <Form.Control type="text" value={formData1.Quote} onChange={(e) => setFormData1({ ...formData1, Quote: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label className="chang">Description</Form.Label>
                                    <Form.Control type="text" value={formData1.Description} onChange={(e) => setFormData1({ ...formData1, Description: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label className="chang">Name</Form.Label>
                                    <Form.Control type="text" value={formData1.name} onChange={(e) => setFormData1({ ...formData1, name: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className="chang">Image</Form.Label>
                                    <Form.Control type="file" onChange={handleImageChange1} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Container>

                <Container>
                    <h2 className="mt-5 text-center">Partners</h2>
                    <h2 className="mt-5 text-center">{partners.title}</h2>
                    <p className="text-center">{partners.description}</p>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {partners && Array.isArray(partners.images) && partners.images.map((image, index) => (
                            <Col key={index}>
                                <Card.Img variant="top" src={`https://three-root-arthropod.glitch.me/${image}`} style={{ height: '250px' }} className="partner-img w-100" />
                                <Button variant="light" className="mt-3" onClick={() => handleUpdateClick3(image)}>Update</Button>
                            </Col>
                        ))}
                    </Row>
                    <Modal show={showModal2} onHide={() => setShowModal2(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Partner</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleFormSubmit2}>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label className="chang">Title</Form.Label>
                                    <Form.Control type="text" value={formData2.title} onChange={(e) => setFormData2({ ...formData2, title: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label className="chang">Description</Form.Label>
                                    <Form.Control type="text" value={formData2.description} onChange={(e) => setFormData2({ ...formData2, description: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className="chang">Image</Form.Label>
                                    <Form.Control type="file" onChange={handleImageChange2} />
                                </Form.Group>
                                <Button variant="primary" type="submit">Save</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Container>


            </div>






        </>
    );
}
