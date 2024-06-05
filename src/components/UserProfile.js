import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from 'react-bootstrap/Card';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Profile from './profile.jpg'
import '../styles/userprofile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UserProfile = () => {
    const [formData, setData] = useState({
        _id: "",
        username: "",
        email: "",
        favoriteAuthors: [],
        favoriteDirectors: [],
        genres: []
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setData({
            _id: user._id,
            username: user.username,
            email: user.email,
            favoriteAuthors: user.favoriteAuthors,
            favoriteDirectors: user.favoriteDirectors,
            genres: user.genres
        });
    }, []);

    const [showInput, setShowInput] = useState(false);
    const [input, setInput] = useState("");

    const [showInput2, setShowInput2] = useState(false);
    const [input2, setInput2] = useState("");

    const handleShowInput = () => {
        setShowInput(!showInput); // Toggle the showInput state
        setShowInput2(false); // Set showInput2 to false
    };

    const handleShowInput2 = () => {
        setShowInput2(!showInput2); // Toggle the showInput2 state
        setShowInput(false); // Set showInput to false
    };

    const handleChangeAuthor = (e) => {
        setInput(e.target.value);
    };

    const handleChangeDirector = (e) => {
        setInput2(e.target.value);
    };

    const handleSubmitInput = async (e) => {
        e.preventDefault();
        try {
            if (input) {
                const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.post("https://storyshelf-backend.onrender.com/api/v1/add-favorite-author", { author: input }, config);
                console.log(response.data);

                const updatedData = {
                    ...formData,
                    favoriteAuthors: [...formData.favoriteAuthors, input]
                };

                setData(updatedData);
                setInput("");
                setShowInput(false);
                toast.success("Author added.");
            } else {
                toast.error("Please try later");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    const handleSubmitInput2 = async (e) => {
        e.preventDefault();
        try {
            if (input2) {
                const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.post("https://storyshelf-backend.onrender.com/api/v1/add-favorite-director", { director: input2 }, config);
                console.log(response.data)


                const updatedData = {
                    ...formData,
                    favoriteDirectors: [...formData.favoriteDirectors, input2]
                };

                setData(updatedData);
                setInput2("");
                setShowInput2(false);
                toast.success("Director added.");
            } else {
                toast.error("Please try later");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    const [showGenreInput, setShowGenreInput] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState("");

    const handleShowGenreInput = () => {
        setShowGenreInput(!showGenreInput);
        setShowInput(false);
        setShowInput2(false);
    };

    const handleGenreChange = (e) => {
        const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedGenres(selectedGenres);
    };

    const handleSubmitGenres = async (e) => {
        e.preventDefault();
        try {
            if (selectedGenres.length > 0) {
                const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const selectedGenresString = selectedGenres.join(',');

                const response = await axios.post("https://storyshelf-backend.onrender.com/api/v1/add-genre", { genre: selectedGenresString }, config);
                console.log(response.data);

                const updatedData = {
                    ...formData,
                    genres: [...formData.genres, ...selectedGenres]
                };
                setData(updatedData);
                toast.success("Genres added.");
            } else {
                toast.error("Please select at least one genre.");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-5">
                {(showInput) ? <div className="new-input">
                    <input onChange={handleChangeAuthor} placeholder='Author' type="text" />
                    <div className='new-submit' onClick={handleSubmitInput}>Submit</div>
                </div> : null}
                {(showInput2) ? <div className="new-input">
                    <input placeholder='Director' onChange={handleChangeDirector} type="text" />
                    <div className='new-submit' onClick={handleSubmitInput2}>Submit</div>
                </div> : null}
                {showGenreInput && (
                    <div className="new-input">
                        <select onChange={handleGenreChange}>
                            <option value="">Select genre(s)</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Romance">Romance</option>
                            <option value="School Life">School Life</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Sports">Sports</option>
                            <option value="Adult">Adult</option>
                        </select>
                        <div className="new-submit" onClick={handleSubmitGenres}>
                            Submit
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <Card className="horizontal-card">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <Card.Img className='mob-user-profile' variant="top" src={Profile} alt="User Image" />
                                </div>
                                <div className="col-md-8">
                                    <Card.Body>
                                        <Card.Title>Username: {formData.username}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted my-4">Email: {formData.email}</Card.Subtitle>
                                        <Card.Text>
                                            <div className="list-items">
                                                <div style={{ fontSize: "15px", color: "black" }}>Favorite Authors:</div>
                                                <div style={{ fontSize: "13px", alignItems: "center", color: "red" }} onClick={handleShowInput} className='add-any'><FaPlus style={{ fontSize: "10px", alignItems: "center", color: "red" }} ></FaPlus> Add</div>
                                            </div>
                                            <div className="list-container">
                                                <div className="list-items">
                                                    {formData.favoriteAuthors.map((author, index) => (
                                                        <div key={index} style={{ fontSize: "15px" }} >{author}</div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="list-items">
                                                <div style={{ fontSize: "15px", color: "black" }}>Favorite Directors:</div>
                                                <div style={{ fontSize: "13px", alignItems: "center", color: "red" }} onClick={handleShowInput2} className='add-any'><FaPlus style={{ fontSize: "10px", alignItems: "center" }}></FaPlus> Add</div>
                                            </div>
                                            <div className="list-container">
                                                <div className="list-items">
                                                    {formData.favoriteDirectors.map((director, index) => (
                                                        <div key={index} style={{ fontSize: "15px" }}>{director}</div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="list-items">
                                                <div style={{ fontSize: "15px", color: "black" }}>Genres:</div>
                                                <div style={{ fontSize: "13px", alignItems: "center", color: "red" }} onClick={handleShowGenreInput} className='add-any'><FaPlus style={{ fontSize: "10px", alignItems: "center" }} ></FaPlus> Add</div>
                                            </div>
                                            <div className="list-container">
                                                <div className="list-items">
                                                    {formData.genres.map((genre, index) => (
                                                        <div key={index} style={{ fontSize: "15px" }}>{genre}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default UserProfile;
