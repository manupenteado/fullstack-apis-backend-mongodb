import mongoose from 'mongoose';

const userMovieListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: String, required: true }, // ID do filme (pode ser do TMDB, IMDB, etc)
  listType: { type: String, enum: ['wantToWatch', 'watched'], required: true },
  rating: { type: Number, min: 1, max: 5, required: false }, // Avaliação do filme
});

userMovieListSchema.index({ user: 1, movieId: 1, listType: 1 }, { unique: true },);


export default mongoose.model('UserMovieList', userMovieListSchema);
