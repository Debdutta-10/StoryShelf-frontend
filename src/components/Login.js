import React, { useState } from 'react';
import { Container, Wrapper, LeftPanel, RightPanel, Title, Input, Button, SignUpButton} from '../styles/Regstyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate ,useLocation} from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
      });
    
      const navigate = useNavigate();
      const location = useLocation();
    
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
          const result = await axios.post("https://storyshelf-backend.onrender.com/api/v1/login", {
            username: form.name,
            password: form.password,
          });
          if (result.status === 200) {
            if (result.data.success) {
              localStorage.setItem("token", JSON.stringify(result.data.token));
              localStorage.setItem("user", JSON.stringify(result.data.user));
              alert(result.data.message);
              toast.success(result.data.message);
              navigate(location.state||'/')
            } else {
              setErrors({ ...errors, form: result.data.message });
              toast.error(result.data.message);
            }
          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message || "Something went wrong");
          } else {
            toast.error("Something went wrong");
          }
        }
      };
    
    return (
        <>
            <Container>
                <Wrapper>
                    <LeftPanel>
                        <Title>Login</Title>
                        <Input type="text" placeholder="Username" name="name" onChange={handleInputChange} />
                        <p style={{ color: 'red', fontSize: "10px" }}>{errors.email}</p>
                        <Input type="password" placeholder="Password" name="password" onChange={handleInputChange} />
                        <Button onClick={handleSubmit}>Login</Button>
                    </LeftPanel>
                    <RightPanel>
                        <Title style={{fontSize: "20px" }}>Welcome to StoryShelf</Title>
                        <p style={{fontSize: "15px",textAlign:"center",margin:"5px"}}>"Storyshelf - Where your tales come to life, one book and film at a time."</p>
                        <SignUpButton onClick={() => navigate("/Register")}>Register</SignUpButton>
                    </RightPanel>
                </Wrapper>
            </Container>
            <ToastContainer />
        </>
    )
}

export default Login
