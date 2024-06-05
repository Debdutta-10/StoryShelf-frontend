import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Card } from 'react-bootstrap'; // Import Card component
import '../styles/card.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Profile from './profile.jpg'

const UserById = () => {
    const [userDetails, setUserDetails] = useState(null);
    const { id } = useParams(); // Fetching ID from URL

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { data } = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/getuserbyid/${id}`);
                if (data.message === "User found successfully") {
                    setUserDetails(data.user);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch user details");
            }
        };
        fetchUserDetails(); // Call the fetchUserDetails function
    }, [id]); // Add id as a dependency

    return (
        <>
        <Navbar></Navbar>
            <div className="row" style={{marginTop:"25px"}}>
                <div className="col-md-6 mx-auto">
                    <Card className="horizontal-card">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <Card.Img className='mob-user-profile' variant="top" src={Profile} alt="User Image" />
                            </div>
                            <div className="col-md-8">
                                <Card.Body>
                                    <Card.Title>Username: {userDetails?.username}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted my-4">Email: {userDetails?.email}</Card.Subtitle>
                                    <Card.Text>
                                        <div className="list-items">
                                            <div style={{ fontSize: "15px", color: "black" }}>Favorite Authors:</div>
                                            {userDetails?.favoriteAuthors.map((author, index) => (
                                                <div key={index} style={{ fontSize: "15px" }}>{author}</div>
                                            ))}
                                        </div>

                                        <div className="list-items">
                                            <div style={{ fontSize: "15px", color: "black" }}>Favorite Directors:</div>
                                            {userDetails?.favoriteDirectors.map((director, index) => (
                                                <div key={index} style={{ fontSize: "15px" }}>{director}</div>
                                            ))}
                                        </div>

                                        <div className="list-items">
                                            <div style={{ fontSize: "15px", color: "black" }}>Genres:</div>
                                            {userDetails?.genres.map((genre, index) => (
                                                <div key={index} style={{ fontSize: "15px" }}>{genre}</div>
                                            ))}
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default UserById;
