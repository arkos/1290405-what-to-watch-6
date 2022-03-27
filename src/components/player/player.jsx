import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllMovies } from "../../store/selectors/selectors";
import NotFound from "../not-found/not-found";
import VideoPlayer from "../video-player/video-player";
import { AppRoute } from "../../util/const";

const Player = () => {
  const { id } = useParams();

  const [isPlaying, setIsPlaying] = useState(true);

  const movies = useSelector((state) => getAllMovies(state));

  const history = useNavigate();

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return <NotFound />;
  }

  const exitPlayer = () => {
    if (history.length > 1) {
      history.goBack();
      return;
    }
    history.push(AppRoute.ROOT);
  };

  return (
    <VideoPlayer
      movie={movie}
      shouldPlay={isPlaying}
      isPreview={false}
      onPlayButtonClick={() => setIsPlaying(!isPlaying)}
      onExitButtonClick={() => exitPlayer()}
      preload="auto"
    />
  );
};

export default Player;
