import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import axios from 'axios';
import { Card, Button, Row, Form, Col } from 'react-bootstrap';


export default function Results() {
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

  useEffect(() => {
    if (localStorage.getItem('login') !== 'true') {

      window.location.href='/'
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
      window.alert(error);
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



  const handleSubmit5 = async (e) => {
    e.preventDefault()
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
      window.alert(error)
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
              Edit Home
            </h1>
          </div>

          <div
            class="relative overflow-x-auto shadow-md sm:rounded-lg"
            style={{ borderRadius: 0, marginTop: "30px" }}
          >
            <Card border="light" className=" cards   shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">Edit Home Video</h5>
                <Form >
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


            <div className="card cards   shadow-sm mb-4">
              <div className="card-body">
                <h5 className="mb-4">Edit ScholarShips</h5>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="title" className="form-label">Add Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="image" className="form-label">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        id="image"
                        onChange={handleImageChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="subtitle" className="form-label">Subtitle Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subtitle"
                        placeholder="Enter Subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="paragraph" className="form-label">Paragraph</label>
                      <textarea
                        className="form-control"
                        id="paragraph"
                        placeholder="Enter Paragraph"
                        value={paragraph}
                        onChange={(e) => setParagraph(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit1} type="submit">
                      Add Scholarship
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card cards   shadow-sm mb-4">
              <div className="card-body">
                <h5 className="mb-4">Edit Campus Life</h5>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="title" className="form-label">Add Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter Title"
                        value={title1}
                        onChange={(e) => setTitle1(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="image" className="form-label">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        id="image"
                        onChange={handleImageChange1}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="subtitle" className="form-label">Subtitle Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subtitle"
                        placeholder="Enter Subtitle"
                        value={subtitle1}
                        onChange={(e) => setSubtitle1(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="paragraph" className="form-label">Paragraph</label>
                      <textarea
                        className="form-control"
                        id="paragraph"
                        placeholder="Enter Paragraph"
                        value={paragraph1}
                        onChange={(e) => setParagraph1(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit2} type="submit">
                      Add Campus Life
                    </button>
                  </div>
                </form>
              </div>
            </div>


            <div className="card cards   shadow-sm mb-4">
              <div className="card-body">
                <h5 className="mb-4">Add Graduates</h5>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="image" className="form-label">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        id="image"
                        onChange={handleImageChange2}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="paragraph" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="paragraph"
                        placeholder="Enter Name"
                        value={namee}
                        onChange={(e) => setname(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="title" className="form-label">Add Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter Designation"
                        value={Quote}
                        onChange={(e) => setQuote(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="paragraph" className="form-label">College</label>
                      <input
                        type="text"
                        className="form-control"
                        id="paragraph"
                        placeholder="Enter College"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit3} type="submit">
                      Add Graduate
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card cards    shadow-sm mb-4">
              <div className="card-body">
                <h5 className="mb-4">Add Educators</h5>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="image" className="form-label">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        id="image"
                        onChange={handleImageChange3}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="paragraph" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="paragraph"
                        placeholder="Enter Name"
                        value={namee2}
                        onChange={(e) => setname2(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="title" className="form-label">Add Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter Designation"
                        value={Quote1}
                        onChange={(e) => setQuote1(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="paragraph" className="form-label">College</label>
                      <input
                        type="text"
                        className="form-control"
                        id="paragraph"
                        placeholder="Enter College"
                        value={Description1}
                        onChange={(e) => setDescription1(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit4} type="submit">
                      Add Educator
                    </button>
                  </div>
                </form>
              </div>
            </div>


            <div className="card cards   shadow-sm mb-4">
              <div className="card-body">
                <h5 className="mb-4">Edit International Office</h5>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="image" className="form-label">Upload Video Link</label>
                      <input
                        type="text"
                        className="form-control"
                        id="image"
                        placeholder="Enter Link"
                        onChange={(e) => setvideoLink(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="title" className="form-label">Add Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter Title"
                        value={title2}
                        onChange={(e) => setTitle2(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="paragraph" className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="paragraph"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit5} type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card  cards  shadow-sm mb-4">
              <div className="card-body">
                <h5 className="mb-4">Add Partners</h5>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="title" className="form-label">Add Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter Title"
                        value={title4}
                        onChange={(e) => setTitle4(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="description" className="form-label">Add Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Enter Description"
                        value={description3}
                        onChange={(e) => setdescription3(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="images" className="form-label">Upload Images</label>
                      <input
                        type="file"
                        className="form-control"
                        id="images"
                        accept="image/*"
                        onChange={handleImageChange4}
                        multiple
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit6} type="submit">
                      Add Partners
                    </button>
                  </div>
                </form>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
