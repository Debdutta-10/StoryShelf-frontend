import React, { useState, useEffect } from 'react';
import '../styles/card.css';
import moment from 'moment';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBook } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ActivityCard = ({ item, onClick }) => {
    const [contentDetails, setContentDetails] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (item.type === 'book') {
            fetchBookDetails(item.activityId);
            fetchUserDetails(item.userId);
        } else if (item.type === 'movie') {
            fetchMovieDetails(item.activityId);
            fetchUserDetails(item.userId);
        }
    }, [item.type, item.activityId, item.userId]);

    const fetchBookDetails = async (activityId) => {
        try {
            const { data } = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/getbook/${activityId}`);
            if (data.success) {
                setContentDetails(data.book);
            } else {
                toast.error(data.message);
                setContentDetails(null); // Reset contentDetails to null if book details are not found
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch book details");
            setContentDetails(null); // Reset contentDetails to null on error
        }
    };

    const fetchMovieDetails = async (activityId) => {
        try {
            const { data } = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/getmovie/${activityId}`);
            if (data.success) {
                setContentDetails(data.movie);
            } else {
                toast.error(data.message);
                setContentDetails(null); // Reset contentDetails to null if movie details are not found
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch movie details");
            setContentDetails(null); // Reset contentDetails to null on error
        }
    };

    const fetchUserDetails = async (userId) => {
        try {
            const { data } = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/getuserbyid/${userId}`);
            if (data.message === "User found successfully") {
                setUserDetails(data.user);
            } else {
                toast.error(data.message);
                setUserDetails(null); // Reset userDetails to null if user details are not found
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch user details");
            setUserDetails(null); // Reset userDetails to null on error
        }
    };

    const addBookhandler = () => {
        navigate(`/add-book/${item.activityId}`);
    };

    const addMoviehandler = () => {
        navigate(`/add-movie/${item.activityId}`);
    };

    const showUserhandler = () => {
        navigate(`/user/${item.userId}`);
    };

    return (
        <div className="card card-container" style={{ width: '18rem', marginTop: "25px" }} onClick={onClick}>
            <div className="card-body">
                {contentDetails && (
                    <>
                        <p className="card-text">{item.type === 'book' ? <FaBook style={{ fontSize: "25px" }} /> : <BiSolidMoviePlay style={{ fontSize: "30px" }} />}</p>
                        {userDetails && (
                            <p className="card-text" onClick={showUserhandler}>Username: {userDetails.username}</p>
                        )}
                        <p className="card-text">Timestamp: {moment(new Date(item.timestamp).toLocaleString()).format('DD-MM-YYYY')}</p>
                        <p className="card-text" onClick={item.type === 'book' ? addBookhandler : addMoviehandler}>{item.type === 'book' ? 'Book Name' : 'Movie Name'}: {contentDetails.title}</p>
                        <p className="card-text" onClick={item.type === 'book' ? addBookhandler : addMoviehandler}> Rating : {contentDetails.rating } <FaStar style={{fontSize:"12px"}}></FaStar></p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActivityCard;
