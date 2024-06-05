import React, { useState } from 'react';
import { Container, Wrapper, LeftPanel, RightPanel, Title, Input, Button, SignUpButton } from '../styles/Regstyle';
// import { ToastContainer, toast } from 'react-toastify';
import { Toaster, toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(e.target.value)) {
        setErrors({ ...errors, email: "Invalid email address" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post("https://storyshelf-backend.onrender.com/api/v1/signup", {
        username: form.name,
        email: form.email,
        password: form.password,
      });

      if (result.status === 200) {
        if (result.data.success) {
          console.log(result.data)
          localStorage.setItem("user", JSON.stringify(result.data.user));
          alert("Registered Successfully !!")
          navigate("/login");
        } else {
          setErrors({ ...errors, form: result.data.message });
          toast.error(result.data.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (error.response) {
        // If the error has a response, it means it's from the backend
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        // If no response, it could be a network error
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <LeftPanel>
            <Title>Sign Up</Title>
            <Input type="text" placeholder="Username" name="name" onChange={handleInputChange} />
            <Input type="email" placeholder="Email" name="email" onChange={handleInputChange} />
            <p style={{ color: 'red', fontSize: "10px" }}>{errors.email}</p>
            <Input type="password" placeholder="Password" name="password" onChange={handleInputChange} />
            <Button onClick={handleSubmit}>Sign Up</Button>
          </LeftPanel>
          <RightPanel>
            <Title>Welcome to login</Title>
            <p>Already have an account?</p>
            <SignUpButton onClick={() => navigate("/login")}>Login In</SignUpButton>
          </RightPanel>
        </Wrapper>
      </Container>
    <Toaster></Toaster>
    </>
  );
}

export default Register;
