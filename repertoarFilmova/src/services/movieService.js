import axios from "axios";

const API_URL = "http://localhost:5111/api/Movies";

export const getMovies = async () => {
    return await axios.get(API_URL);
}

export const addMovie = async (movie) => {
    return await axios.post(API_URL, movie)
}

export const getMovieById = async (id) => {
    return await axios.get(`${API_URL}/${id}`)
}

export const updateMovie = async (id, movie) => {
    return await axios.put(`${API_URL}/${id}`, movie)
}

export const likeMovie = async (id) => {
    return await axios.put(`${API_URL}/${id}/like`)
}

export const dislikeMovie = async (id) => {
    return await axios.put(`${API_URL}/${id}/dislike`)
}

export const deleteMovie = async (id) => {
    return await axios.delete(`${API_URL}/${id}`)
}