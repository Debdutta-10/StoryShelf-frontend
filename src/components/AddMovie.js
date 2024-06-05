import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/add-book.css'
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        genre: '',
        releaseDate: '',
        status: 'planning',
        rating: 0,
        review: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let formErrors = {};
        if (!formData.title) formErrors.title = "Title is required";
        if (!formData.director) formErrors.director = "Director is required";
        if (!formData.genre) formErrors.genre = "Genre is required";
        if (!formData.releaseDate) formErrors.releaseDate = "Release Date is required";
        return formErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            try {
                const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.post('https://storyshelf-backend.onrender.com/api/v1/addmovie', formData, config);
                console.log(response.data);
                // Reset form after successful submission
                setFormData({
                    title: '',
                    director: '',
                    genre: '',
                    releaseDate: '',
                    status: 'planning',
                    rating: 0,
                    review: ''
                });
                setErrors({});
                toast.success("Movie added successfully !");
                navigate('/');
                
            } catch (error) {
                console.error("There was an error adding the movie!", error);
                toast.error("There was an error adding the movie!");
            }
        } else {
            setErrors(formErrors);
            toast.error(formErrors);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3">
                <h3 className="mb-4" style={{textAlign:"center"}}>Add a New Movie</h3>
                <form onSubmit={handleSubmit} className='addbook-form'>
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
                        <label htmlFor="director">Director:</label>
                        <input
                            type="text"
                            id="director"
                            name="director"
                            className="form-control"
                            value={formData.director}
                            onChange={handleChange}
                        />
                        {errors.director && <p className="text-danger">{errors.director}</p>}
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
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input
                            type="date"
                            id="releaseDate"
                            name="releaseDate"
                            className="form-control"
                            value={formData.releaseDate}
                            onChange={handleChange}
                        />
                        {errors.releaseDate && <p className="text-danger">{errors.releaseDate}</p>}
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

                    <button type="submit" className="btn btn-primary">Add Movie</button>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default AddMovie;