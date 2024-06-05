import React from 'react';
import '../styles/card.css';
import { Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaShare } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {

    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = String(date.getFullYear()).slice(2);
        return `${day}-${month}-${year}`;
    };

    const deleteMovieHandler = async () => {
        try {
            const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.delete(`https://storyshelf-backend.onrender.com/api/v1/deletemovie/${movie._id}`, config);
            if(response.status===200){
                toast.success('Movie deleted successfully');
                window.location.reload();
            }else{
                toast.error(response.message);
            }


        } catch (error) {
            
            console.error('Error deleting movie:', error);
            toast.error('Failed to delete movie');
        }
    };

    const editMovieHandler=async()=>{
        navigate(`/edit-movie/${movie._id}`);
    }

    const shareMovieHandler = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user._id;
            const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(`https://storyshelf-backend.onrender.com/api/v1/share/movie/${movie._id}`, {}, config);
            console.log(response.data);
            toast.success('Movie shared successfully');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Something went wrong");
            } else {
                console.error('Error sharing Movie:', error);
                toast.error('Failed to share Movie');
            }

        }
    };


    return (
        <div className="card card-container" style={{ width: '18rem' }}>
            <div className="card-body">
                <h3 className="card-title">{movie.title}</h3>
                <h6 className="card-subtitle mb-2 text-muted">Director: {movie.director}</h6>
                <p className="card-text">Genre: {movie.genre}</p>
                <p className="card-text">Release Date: {formatDate(movie.releaseDate)}</p>
                <p className="card-text">Status: {movie.status}</p>
                <p className="card-text">Rating: {movie.rating} <FaStar style={{fontSize:"12px"}}></FaStar> </p>
                <p className="card-text">Review: {movie.review}</p>
                <div className="button-container">
                    <Button style={{ width: "20%", backgroundColor: "#FFE5B4", border: "none", color: "#ff4b2b" }} onClick={deleteMovieHandler}>
                        <FaTrash></FaTrash>
                    </Button>
                    <Button style={{ width: "20%", backgroundColor: "#FFE5B4", border: "none", color: "#ff4b2b" }} onClick={editMovieHandler}>
                        <FaEdit></FaEdit>
                    </Button>
                    <Button style={{ width: "20%", backgroundColor: "#FFE5B4", border: "none", color: "#ff4b2b" }} onClick={shareMovieHandler}>
                        <FaShare></FaShare>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
