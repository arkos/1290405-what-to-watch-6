import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getAllMovies} from '../../store/selectors/selectors';
import NotFound from '../not-found/not-found';
import VideoPlayer from '../video-player/video-player';


const Player = () => {
  const {id} = useParams();

  const [isPlaying, setIsPlaying] = useState(true);

  const movies = useSelector((state) => getAllMovies(state));

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return <NotFound />;
  }

  return (
    <VideoPlayer
      movie={movie}
      shouldPlay={isPlaying}
      isPreview={false}
      onPlayButtonClick={() => setIsPlaying(!isPlaying)}
      preload="auto" />
  );
};

export default Player;
