import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/navbar.css';
import '../styles/dashboard.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookCard from './BookCard';
import MovieCard from './MovieCards';
import ActivityCard from './ActivityCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [status, setStatus] = useState("Activity");
    const [content, setContent] = useState([]);
    const [contentDetails, setContentDetails] = useState(null);

    const navigate = useNavigate();

    const DisplayStatusContent = async () => {
        try {
            const { data } = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/activities`);
            if (data.success) {
                setContent(data.activities);
                // console.log(data.activities)
                // console.log(data.sharedActivity);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    navigate('/register'); 
                    return; 
                }

                const formattedToken = token.replace(/^"(.*)"$/, '$1');
                const config = {
                    headers: {
                        Authorization: `Bearer ${formattedToken}`
                    }
                };


                switch (status) {
                    case 'CompletedBooks':
                        const completedBooksResponse = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/getbooks`, config);
                        if (completedBooksResponse.data.success) {
                            setContent(completedBooksResponse.data.completedBooks);
                            // console.log(completedBooksResponse.data.completedBooks)
                        } else {
                            toast.error(completedBooksResponse.data.message);
                        }
                        break;
                    case 'PlanningBooks':
                        const planningBooksResponse = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/getbooks`, config);
                        if (planningBooksResponse.data.success) {
                            setContent(planningBooksResponse.data.planningBooks);
                        } else {
                            toast.error(planningBooksResponse.data.message);
                        }
                        break;
                    case 'CompletedMovies':
                        const completedMoviesResponse = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/getmovies`, config);
                        if (completedMoviesResponse.data.success) {
                            setContent(completedMoviesResponse.data.completedMovies);
                        } else {
                            toast.error(completedMoviesResponse.data.message);
                        }
                        break;
                    case 'PlanningMovies':
                        const planningMoviesResponse = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/getmovies`, config);
                        if (planningMoviesResponse.data.success) {
                            setContent(planningMoviesResponse.data.planningMovies);
                        } else {
                            toast.error(planningMoviesResponse.data.message);
                        }
                        break;
                    default:
                        const activityResponse = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/activities`);
                        if (activityResponse.data.success) {
                            setContent(activityResponse.data.activities);
                            // console.log(activityResponse.data);
                        } else {
                            toast.error(activityResponse.data.message);
                        }
                }
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        };

        fetchData();
    }, [status]);


    const fetchBookDetails = async (activityId) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/getbook/${activityId}`);
            if (data.success) {
                setContentDetails(data.book);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch book details");
        }
    };

    const fetchMovieDetails = async (activityId) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/getmovie/${activityId}`);
            if (data.success) {
                setContentDetails(data.movie);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch movie details");
        }
    };

    // const handleContentClick = (item) => {
    //     if (item.type === 'book') {
    //         fetchBookDetails(item.activityId);
    //     } else if (item.type === 'movie') {
    //         fetchMovieDetails(item.activityId);
    //     }
    // };

    const handleAddBookNavigate = () => {
        navigate("/add-book");
    }
    const handleAddMovieNavigate = () => {
        navigate("/add-movie");
    }

    return (
        <>
            <Navbar />
            <ToastContainer />
            <nav className='top-navbar2'>
                <div className='navbar2-content' onClick={() => setStatus("Activity")}>Activity</div>
                <div className='navbar2-content' onClick={() => setStatus("CompletedBooks")}>Completed - Books</div>
                <div className='navbar2-content' onClick={() => setStatus("PlanningBooks")}>Planning - Books</div>
                <div className='navbar2-content' onClick={() => setStatus("CompletedMovies")}>Completed - Movies</div>
                <div className='navbar2-content' onClick={() => setStatus("PlanningMovies")}>Planning - Movies</div>
            </nav>
            {(status === "CompletedBooks" || status === "PlanningBooks") ? (
                <button className='add-book' onClick={handleAddBookNavigate}>Add Book</button>
            ) : status === "CompletedMovies" || status === "PlanningMovies" ? (
                <button className='add-book' onClick={handleAddMovieNavigate}>Add Movie</button>
            ) : null}

            <div className="status-content">
                {content && (
                    <>
                        {status === "Activity" && content.map((item) => (
                            <ActivityCard key={item._id} item={item} />
                        ))}

                        {(status === "CompletedBooks" || status === "PlanningBooks") && content.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                        {(status === "CompletedMovies" || status === "PlanningMovies") && content.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}

                    </>
                )}
            </div>

            {/* {contentDetails && (
                <div className="content-details">
                    <h2>{contentDetails.title}</h2>
                    <p>{contentDetails.type}</p>
                    <p>Creator:  {contentDetails.author || contentDetails.director}</p>
                    <p>Genre: {contentDetails.genre}</p>
                    <p>Status: {contentDetails.status}</p>
                    <p>Rating: {contentDetails.rating}</p>
                    <p>Review: {contentDetails.review}</p>
                </div>
            )} */}
        </>
    );
};

export default Dashboard;
