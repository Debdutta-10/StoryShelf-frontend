import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/add-book.css';

const AddBookId = () => {
    const { id } = useParams(); // Fetching ID from URL
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        status: 'planning',
        rating: 0,
        review: '',
        publishedDate: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id)
        const fetchBookData = async () => {
            try {
                const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`https://storyshelf-backend.onrender.com/api/v1/getbook/${id}`, config);
                setFormData(response.data.book);
            } catch (error) {
                console.error('Error fetching book data:', error);
                toast.error('Error fetching book data');
            }
        };
        fetchBookData();
    }, [id]);

    const validate = () => {
        let formErrors = {};
        if (!formData.title) formErrors.title = 'Title is required';
        if (!formData.author) formErrors.author = 'Author is required';
        if (!formData.genre) formErrors.genre = 'Genre is required';
        return formErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            try {
                const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.post(`https://storyshelf-backend.onrender.com/api/v1/addbook`, formData, config);
                toast.success('Book Added successfully!');
                navigate('/');
            } catch (error) {
                console.error('Error Adding the book:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    console.error(error.response.data.message);
                    toast.error(`${error.response.data.message}`);
                } else {
                    toast.error('There was an error Adding the book!');
                }
            }
        } else {
            setErrors(formErrors);
            toast.error('Please fix the errors before submitting');
        }
    };
    

    return (
        <>
            <Navbar />
            <div className="container my-3">
                <h3 className="mb-4" style={{ textAlign: 'center' }}>
                    Add Book
                </h3>
                <form onSubmit={handleSubmit} className="addbook-form">
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <p className="text-danger">{errors.title}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author:</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            className="form-control"
                            value={formData.author}
                            onChange={handleChange}
                        />
                        {errors.author && <p className="text-danger">{errors.author}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">Genre:</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            className="form-control"
                            value={formData.genre}
                            onChange={handleChange}
                        />
                        {errors.genre && <p className="text-danger">{errors.genre}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            className="form-control"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="planning">Planning</option>
                            <option value="completed">Completed</option>
                        </select>
                        {errors.status && <p className="text-danger">{errors.status}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating (0-5):</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            className="form-control"
                            value={formData.rating}
                            onChange={handleChange}
                            min="0"
                            max="5"
                        />
                        {errors.rating && <p className="text-danger">{errors.rating}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="review">Review:</label>
                        <input
                            type="text"
                            id="review"
                            name="review"
                            className="form-control"
                            value={formData.review}
                            onChange={handleChange}
                        />
                        {errors.review && <p className="text-danger">{errors.review}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Book
                    </button>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default AddBookId;
