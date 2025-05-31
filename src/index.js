import express, { application } from 'express';
import dotenv from 'dotenv';
import db from './database/configdb.js';
import userRoute from './routes/user.route.js';
import exempleRoute from './routes/exemple.route.js';
import userMovieListRoutes from './routes/userMovieList.routes.js';
import cors from 'cors';

dotenv.config();
db.connect();

const app = express();

//converte o que a gente recebe no servidor para um obj javascript
app.use(express.json());
app.use(cors());

app.use("/users", userRoute);
app.use("/secureExempleRoute", exempleRoute);
app.use('/user-movie-list', userMovieListRoutes);

app.get('/', (req, res) => {
    res.send({message: 'Hello everyone!'});
    });

//se a variavel nao for definida, ele vai usar o 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server is running on port http://localhost:${PORT}/`);});

export default app;