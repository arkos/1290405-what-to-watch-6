import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({isPlaying, src, ...restProps}) => {
  const videoRef = useRef();

  useEffect(() => {

    return () => {
      videoRef.current.oncanplaythrough = null;
      videoRef.current.onplay = null;
      videoRef.current.onpause = null;
    };
  }, [src]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
      return;
    }
    videoRef.current.pause();
  }, [isPlaying]);

  // TODO: Use isLoading to prevent video from playing if it's not yet loaded, use videoRef.current.oncanplaythrough

  return (
    <video ref={videoRef} {...restProps}>
      <source src={src}/>
      Your browser doesn&apos;t support HTML5 video.
    </video>
  );
};

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
};

export default VideoPlayer;
