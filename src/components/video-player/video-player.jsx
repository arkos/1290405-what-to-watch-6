import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({defaultIsPlaying, src, ...restProps}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(defaultIsPlaying);

  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.oncanplaythrough = () => setIsLoading(false);
    videoRef.current.onplay = () => setIsPlaying(true);
    videoRef.current.onpause = () => setIsPlaying(false);

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

  // TODO: Remove disabled attribute

  return (
    <video disabled={isLoading} ref={videoRef} {...restProps}>
      <source src={src}/>
      Your browser doesn&apos;t support HTML5 video.
    </video>
  );
};

VideoPlayer.propTypes = {
  defaultIsPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
};

export default VideoPlayer;
