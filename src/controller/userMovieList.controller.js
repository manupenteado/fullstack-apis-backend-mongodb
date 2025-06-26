import UserMovieList from '../models/UserMovieList.js';

export const addMovie = async (req, res) => {
  const { movieId, listType } = req.body;
  try {
    // Verifica se já existe esse filme na lista do usuário
    const exists = await UserMovieList.findOne({
      user: req.userId,
      movieId,
      listType
    });
    if (exists) {
      return res.status(409).json({ error: 'Filme já está na lista.' });
    }

    const entry = await UserMovieList.create({
      user: req.userId,
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
      user: req.userId,
      listType: req.params.listType
    });
    res.json(movies);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMovieFromList = async (req, res) => {
  try {
    const { movieId, listType } = req.body;
    const deleted = await UserMovieList.findOneAndDelete({
      user: req.userId,
      movieId,
      listType
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Filme não encontrado na lista.' });
    }
    res.status(200).json({ message: 'Filme removido da lista com sucesso.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const rateMovie = async (req, res) => {
  const { movieId, rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'The rating must be an integer number between 1 and 5.' });
  }

  try {
    const movieEntry = await UserMovieList.findOne({
      user: req.userId,
      movieId,
      listType: 'watched'
    });

    if (!movieEntry) {
      return res.status(404).json({ error: 'Movie not found on "watched".' });
    }

    movieEntry.rating = rating;
    await movieEntry.save();

    res.status(200).json({ message: 'Your rating was sucessful.', movie: movieEntry });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
