import React from 'react';
import {render, screen} from '@testing-library/react';
import VideoPlayer from '../video-player/video-player';

describe(`Test VideoPlayer`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = () => {};
    window.HTMLMediaElement.prototype.load = () => {};
  });

  it(`VideoPlayer should be rendered correctly`, () => {
    const movie = {
      videoUrl: `video-url`,
      previewVideoUrl: `preview-video-url`,
      previewImagePath: `preview-image-path`,
      backGroundImagePath: `background-image-path`,
      name: `Movie`,
      backgroundColor: `#000000`,
      description: `Movie description`,
      rating: 8,
      score: 100,
      director: ``,
      starring: [],
      runTime: 90,
      genre: ``,
      released: 2020,
      isFavorite: false,
      id: 1
    };

    const {container} = render(
        <VideoPlayer
          shouldPlay={true}
          isPreview={false}
          movie={movie}
          onPlayButtonClick={jest.fn()}
          onExitButtonClick={jest.fn()}
        />
    );

    expect(screen.getAllByRole(`button`)).toHaveLength(3);
    expect(container.querySelector(`video`)).toBeInTheDocument();
  });
}
);
