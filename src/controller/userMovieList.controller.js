import UserMovieList from '../models/UserMovieList.js';

export const addMovie = async (req, res) => {
  const { movieId, listType } = req.body;
  try {
    const entry = await UserMovieList.create({
      user: req.userId, // <-- Corrigido aqui
      movieId,
      listType
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await UserMovieList.find({
      user: req.userId, // <-- Corrigido aqui
      listType: req.params.listType
    });
    res.json(movies);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};