import express from 'express';
import verifyToken from '../middleware/jwt.token.middleware.js';
import { addMovie, getMovies } from '../controller/userMovieList.controller.js';

const router = express.Router();

// Adicionar filme à lista
router.post('/', verifyToken, addMovie);

// Listar filmes do usuário por tipo de lista
router.get('/:listType', verifyToken, getMovies);

export default router;