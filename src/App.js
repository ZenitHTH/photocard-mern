import { useEffect, useState } from "react";
import { CardGroup, Col, Row } from "react-bootstrap";
import { Buffer } from "buffer";
import PhotoComponent from "./components/photo.component";
import UploadFrom from "./components/upload-form.component";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [photos, setPhotos] = useState([]);

  async function fetchImage() {
    try {
      const response = await fetch("http://127.0.0.1:4000/");
      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      <UploadFrom />
      <CardGroup className="m-3">
        <Row className="justify-content-center g-8">
          {photos.map((data, index) => {
            const base64img = Buffer(data.img.data, "base64").toString(
              "base64"
            );
            return (
              <Col md="auto">
                <PhotoComponent
                  width="24rem"
                  image={`data:image;base64,${base64img}`}
                  title={data.name}
                />
              </Col>
            );
          })}
        </Row>
      </CardGroup>
    </div>
  );
}

export default App;
