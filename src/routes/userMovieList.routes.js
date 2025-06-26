import express from 'express';
import verifyToken from '../middleware/jwt.token.middleware.js';
import { addMovie, getMovies, deleteMovieFromList } from '../controller/userMovieList.controller.js';

const router = express.Router();

// Adicionar filme à lista
router.post('/', verifyToken, addMovie);

// Listar filmes do usuário por tipo de lista
router.get('/:listType', verifyToken, getMovies);

// Remover filme da lista
router.delete('/', verifyToken, deleteMovieFromList);

// Atribuir nota ao filme da lista "watched"
router.put('/rate', verifyToken, rateMovie);

export default router;