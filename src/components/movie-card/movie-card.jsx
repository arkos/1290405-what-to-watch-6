import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import Validator from '../../validate';

const MovieCard = ({movie}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const {previewImagePath, previewVideoUrl, name, id} = movie;
  return (
    <article className="small-movie-card catalog__movies-card">
      <VideoPlayer
        src={`https://cdn.videvo.net/videvo_files/video/free/2017-08/small_watermarked/170724_15_Setangibeach_preview.webm`}
        defaultIsPlaying={false}
        width="280"
        height="175"
      />
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: Validator.MOVIE
};

export default MovieCard;
