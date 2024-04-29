import React, { useState, useEffect } from "react";
import axios from "axios"; // Correct import statement
import Form from "react-bootstrap/Form";

const Adddata = () => {

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the API
  const fetchData = () => {
    axios
      .get("http://localhost:8000/main/get")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch data when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    console.log(formData);
    try {
      await axios.post("http://localhost:8000/main/post", formData);
      console.log(formData);
      // If you want to refresh data after adding, you can call fetchData here
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add Data</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <button type="submit">Add</button>
      </form>

      <div>
  <h2>Fetched Data</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Image</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td><img src={`http://localhost:8000/uploads/${item.image}`} alt="" style={{width:"200px",height:"200px"}}/></td>
          {/* <td><button className='btn btn-warning' onClick={()=>{setupdatedata(item); handleShow()}}>Update</button>&nbsp;</td> */}
          {/* <td><button className='btn btn-danger' onClick={()=>confirmDelete(item._id)}>Delete</button> </td> */}
        
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Adddata;
