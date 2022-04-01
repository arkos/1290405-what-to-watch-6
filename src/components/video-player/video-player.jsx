import React, { useEffect, useRef, useState } from "react";

export const PlayerControl = {
  PLAY: `PLAY`,
  PAUSE: `PAUSE`,
  LOAD: `LOAD`,
};

export const PlayerEvent = {
  PLAYING: `PLAYING`,
  PAUSED: `PAUSED`,
  CANPLAYTHROUGH: `CANPLAYTHROUGH`,
  CANPLAY: `CANPLAY`,
  LOAD_START: `LOAD_START`,
  LOADED_DATA: `LOADED_DATA`,
  LOADED_METADATA: `LOADED_METADATA`,
};

const VideoPlayer = ({ playerConrol, path, onPlayerEvent, ...restProps }) => {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.onloadstart = () => onPlayerEvent(PlayerEvent.LOAD_START);

    videoRef.current.onloadedmetadata = () =>
      onPlayerEvent(PlayerEvent.LOADED_METADATA);

    videoRef.current.onloadeddata = () =>
      onPlayerEvent(PlayerEvent.LOADED_DATA);

    videoRef.current.oncanplay = () => onPlayerEvent(PlayerEvent.CANPLAY);

    videoRef.current.oncanplaythrough = () =>
      onPlayerEvent(PlayerEvent.CANPLAYTHROUGH);

    videoRef.current.onpaused = () => onPlayerEvent(PlayerEvent.PAUSED);

    videoRef.current.onplaying = () => onPlayerEvent(PlayerEvent.PLAYING);
  }, [onPlayerEvent]);

  useEffect(() => {
    if (playerConrol === PlayerControl.PLAY && videoRef.current.paused) {
      videoRef.current.play();
    } else if (
      playerConrol === PlayerControl.PAUSE &&
      !videoRef.current.paused
    ) {
      videoRef.current.pause();
    } else if (playerConrol === PlayerControl.LOAD) {
      videoRef.current.load();
    }
  }, [playerConrol]);

  return (
    <video ref={videoRef} {...restProps}>
      <source src={path} />
      Your browser doesn&apos;t support HTML5 video.
    </video>
  );
};

export default VideoPlayer;
