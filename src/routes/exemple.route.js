import express from 'express';
import exempleController from '../controller/exemple.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';


const router = express.Router();

router.get('/', verifyToken, exempleController.securedExemple);

export default router;