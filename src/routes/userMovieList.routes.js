import express from 'express';
import UserMovieList from '../models/UserMovieList.js';
import authMiddleware from '../middleware/auth.js'; // se você tiver autenticação JWT

const router = express.Router();

// Adicionar filme à lista
router.post('/', authMiddleware, async (req, res) => {
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
router.get('/:listType', authMiddleware, async (req, res) => {
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

// Remover filme da lista do usuário
router.delete('/:movieId/:listType', authMiddleware, async (req, res) => {
  try {
    const { movieId, listType } = req.params;
    const deleted = await UserMovieList.findOneAndDelete({
      user: req.user.id,
      movieId,
      listType
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Filme não encontrado na lista' });
    }
    res.json({ message: 'Filme removido da lista com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;