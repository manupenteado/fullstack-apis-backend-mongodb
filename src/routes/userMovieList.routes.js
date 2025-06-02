import express from 'express';
import UserMovieList from '../models/UserMovieList.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();

// Adicionar filme à lista
router.post('/', verifyToken, async (req, res) => {
  const { movieId, listType } = req.body;
  try {
    const entry = await UserMovieList.create({
      user: req.user.id, // req.user.id vem do middleware de autenticação
      movieId,
      listType
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar filmes do usuário por tipo de lista
router.get('/:listType', verifyToken, async (req, res) => {
  try {
    const movies = await UserMovieList.find({
      user: req.user.id,
      listType: req.params.listType
    });
    res.json(movies);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;