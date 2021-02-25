import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({shouldPlay, src, ...restProps}) => {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.onpause = () => videoRef.current.load();

    return () => {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.onpause = null;
    };
  }, []);

  useEffect(() => {
    if (shouldPlay) {
      videoRef.current.play().catch(() => {});
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;

  }, [shouldPlay]);

  return (
    <video ref={videoRef} {...restProps}>
      <source src={src}/>
      Your browser doesn&apos;t support HTML5 video.
    </video>
  );
};

VideoPlayer.propTypes = {
  shouldPlay: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
};

export default VideoPlayer;
