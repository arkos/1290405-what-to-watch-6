const POSTER_IMAGE_URL = `https://picsum.photos/218/327`;
const PREVIEW_IMAGE_URL = `https://picsum.photos/218/327`;
const BACKGROUND_IMAGE_URL = `https://picsum.photos/1300/552`;
const VIDEO_URL = `https://www.youtube.com/watch`;
const PREVIEW_VIDEO_URL = `https://www.youtube.com/watch`;

const getRandomColor = () => {
  let letters = `0123456789ABCDEF`;
  let color = `#`;
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


export default [
  {
    id: 1,
    name: `The Grand Budapest Hotel`,
    posterImagePath: POSTER_IMAGE_URL,
    previewImagePath: PREVIEW_IMAGE_URL,
    backgroundImagePath: BACKGROUND_IMAGE_URL,
    backgroundColor: getRandomColor(),
    videoUrl: `${VIDEO_URL}?v=zru-1DbbcsA`,
    previewVideoUrl: `${PREVIEW_VIDEO_URL}?v=zru-1DbbcsA`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    rating: 8.9,
    score: 240,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
    runTime: 99,
    genre: `Comedy`,
    released: 2014,
    isFavorite: false
  },
  {
    id: 2,
    name: `Ad Astra`,
    posterImagePath: POSTER_IMAGE_URL,
    previewImagePath: PREVIEW_IMAGE_URL,
    backgroundImagePath: BACKGROUND_IMAGE_URL,
    backgroundColor: getRandomColor(),
    videoUrl: `${VIDEO_URL}?v=ykC_wu6ffOU`,
    previewVideoUrl: `${PREVIEW_VIDEO_URL}?v=ykC_wu6ffOU`,
    description: `The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.`,
    rating: 6,
    score: 3038,
    director: `Dan Bradley`,
    starring: [`Brad Pitt`, `Tommy Lee Jones`, `Ruth Negga`, `John Ortiz`, `Liv Tyler`],
    runTime: 99,
    genre: `Sci-Fi`,
    released: 2019,
    isFavorite: false
  },
  {
    id: 3,
    name: `Batman`,
    posterImagePath: POSTER_IMAGE_URL,
    previewImagePath: PREVIEW_IMAGE_URL,
    backgroundImagePath: BACKGROUND_IMAGE_URL,
    backgroundColor: getRandomColor(),
    videoUrl: `${VIDEO_URL}?v=ykC_wu6ffOU`,
    previewVideoUrl: `${PREVIEW_VIDEO_URL}?v=ykC_wu6ffOU`,
    description: `The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.`,
    rating: 6,
    score: 3038,
    director: `Dan Bradley`,
    starring: [`Brad Pitt`, `Tommy Lee Jones`, `Ruth Negga`, `John Ortiz`, `Liv Tyler`],
    runTime: 99,
    genre: `Sci-Fi`,
    released: 2019,
    isFavorite: false
  },
];
