import React from 'react';
import '../styles/card.css';
import { Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaShare } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const deleteBookHandler = async () => {
        try {
            const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            await axios.delete(`https://storyshelf-backend.onrender.com/api/v1/deletebook/${book._id}`, config);
            toast.success('Book deleted successfully');
            window.location.reload();

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Something went wrong");
            } else {
                console.error('Error deleting book:', error);
                toast.error('Failed to delete book');
            }

        }
    };

    const shareBookHandler = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user._id;
            const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(`https://storyshelf-backend.onrender.com/api/v1/share/book/${book._id}`, {}, config);
            console.log(response.data);
            toast.success('Book shared successfully');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Something went wrong");
            } else {
                console.error('Error sharing book:', error);
                toast.error('Failed to share book');
            }

        }
    };

    const editBookHandler=()=>{
        navigate(`/edit-book/${book._id}`);
    }

    return (
        <div className="card card-container" style={{ width: '18rem' }}>
            <div className="card-body">
                <h3 className="card-title">{book.title}</h3>
                <h6 className="card-subtitle mb-2 text-muted">Author: {book.author}</h6>
                <p className="card-text">Genre: {book.genre}</p>
                <p className="card-text">Status: {book.status}</p>
                <p className="card-text">Rating: {book.rating} <FaStar style={{fontSize:"12px"}}></FaStar></p>
                <p className="card-text">Review: {book.review}</p>
                <div className="button-container">
                    <Button style={{ width: "20%", backgroundColor: "#FFE5B4", border: "none", color: "#ff4b2b" }} onClick={deleteBookHandler}>
                        <FaTrash></FaTrash>
                    </Button>
                    <Button style={{ width: "20%", backgroundColor: "#FFE5B4", border: "none", color: "#ff4b2b" }} onClick={editBookHandler}>
                        <FaEdit></FaEdit>
                    </Button>
                    <Button style={{ width: "20%", backgroundColor: "#FFE5B4", border: "none", color: "#ff4b2b" }} onClick={shareBookHandler}>
                        <FaShare></FaShare>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
