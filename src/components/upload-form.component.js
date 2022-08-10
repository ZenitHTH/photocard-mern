import { React, useState } from "react";
import { Form, Stack, Navbar, Button } from "react-bootstrap";
import axios from "axios";

const UploadFrom = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const post = () => {
    const data = new FormData();
    data.append("image", image);
    data.append("title", name);
    axios
      .post("http://127.0.0.1:4000/", data)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  return (
    <Navbar bg="light" variant="light">
      <Stack direction="horizontal" gap={3}>
        <Form.Label className="m-1"> Name </Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />
        <div className="vr"></div>
        <Form.Label className="m-1"> Image </Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          size="sm"
        />
        <Button type="submit" onClick={post}>
          Upload
        </Button>
      </Stack>
    </Navbar>
  );
};

export default UploadFrom;
