import { React } from "react";
import { Card } from "react-bootstrap";

const PhotoComponent = ({ title, image, width }) => {
  return (
    <Card style={{ width }} className="justify-content-center m-1">
      <Card.Img
        src={`http://127.0.0.1:4000/${image}`}
        height={250}
        style={{ objectFit: "cover" }}
        variant="top"
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default PhotoComponent;
