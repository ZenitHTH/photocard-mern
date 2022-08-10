import { useEffect, useState } from "react";
import { CardGroup, Col, Row } from "react-bootstrap";
import { Buffer } from "buffer";
import PhotoComponent from "./components/photo.component";
import UploadFrom from "./components/upload-form.component";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [photos, setPhotos] = useState([]);

  async function fetchImageList() {
    try {
      const response = await fetch("http://127.0.0.1:4000/");
      const data = await response.json();
      setPhotos(data)
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchImage (name)
  {
    try {
      const response = await fetch(`http://127.0.0.1:4000/${name}`);
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      return imageObjectURL;
    } catch (err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchImageList();
  }, []);

  return (
    <div>
      <UploadFrom />
      <CardGroup className="m-3">
        <Row className="justify-content-center g-8">
          {photos.map((data, index) => {
            
            return (
              <Col md="auto">
                <PhotoComponent
                  width="24rem"
                  image={data.name}
                  title={!data.title ? "Untitle" : data.title}
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
