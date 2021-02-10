const POSTER_IMAGE_URL = `https://picsum.photos/218/327`;
const PREVIEW_IMAGE_URL = `https://picsum.photos/280/175`;
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
    name: `Guardians of the Galaxy Vol. 2`,
    posterImagePath: POSTER_IMAGE_URL,
    previewImagePath: PREVIEW_IMAGE_URL,
    backgroundImagePath: BACKGROUND_IMAGE_URL,
    backgroundColor: getRandomColor(),
    videoUrl: `${VIDEO_URL}?v=d96cjJhvlMA`,
    previewVideoUrl: `${PREVIEW_VIDEO_URL}?v=d96cjJhvlMA`,
    description: `The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.`,
    rating: 7.6,
    score: 67,
    director: `James Gunn`,
    starring: [`Chris Pratt`, `Zoe Saldana`, `Dave Bautista`, `Vin Diesel`],
    runTime: 136,
    genre: `Action`,
    released: 2017,
    isFavorite: false
  },
  {
    id: 4,
    name: `Secret`,
    posterImagePath: POSTER_IMAGE_URL,
    previewImagePath: PREVIEW_IMAGE_URL,
    backgroundImagePath: BACKGROUND_IMAGE_URL,
    backgroundColor: getRandomColor(),
    videoUrl: `${VIDEO_URL}?v=Kt8oYqu4S_c`,
    previewVideoUrl: `${PREVIEW_VIDEO_URL}?v=Kt8oYqu4S_c`,
    description: `Ye Xiang Lun, a talented piano player is a new student at the prestigious Tamkang School. On his first day, he meets Lu Xiao Yu, a pretty girl playing a mysterious piece of music.`,
    rating: 7.5,
    score: 100,
    director: `Jay Chou`,
    starring: [`Jay Chou`, `Gwei Lun-Mei`, `Anthony Chau-Sang Wong`, `Ming-Ming Su`],
    runTime: 101,
    genre: `Drama`,
    released: 2007,
    isFavorite: true
  },
  {
    id: 5,
    name: `Key`,
    posterImagePath: POSTER_IMAGE_URL,
    previewImagePath: PREVIEW_IMAGE_URL,
    backgroundImagePath: BACKGROUND_IMAGE_URL,
    backgroundColor: getRandomColor(),
    videoUrl: `${VIDEO_URL}?v=_EonRi0yQOE`,
    previewVideoUrl: `${PREVIEW_VIDEO_URL}?v=_EonRi0yQOE`,
    description: `During a routine autopsy, forensic pathologist Martin Revell finds a key in a suicide victim's stomach. His investigation into the seemingly inanimate object leads to a world of obsession, insanity, and homicide.`,
    rating: 3.6,
    score: 55,
    director: `Robert Hamilton`,
    starring: [`Samuel Kay Forrest`, `Nathan Sapsford`, `Jess Webb`, `Farah Lavassani`],
    runTime: 87,
    genre: `Mystery`,
    released: 2011,
    isFavorite: false
  },
  {
    id: 6,
    name: `Avatar`,
    posterImagePath: POSTER_IMAGE_URL,
    previewImagePath: PREVIEW_IMAGE_URL,
    backgroundImagePath: BACKGROUND_IMAGE_URL,
    backgroundColor: getRandomColor(),
    videoUrl: `${VIDEO_URL}?v=5PSNL1qE6VY`,
    previewVideoUrl: `${PREVIEW_VIDEO_URL}?v=5PSNL1qE6VY`,
    description: `A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.`,
    rating: 7.8,
    score: 250,
    director: `James Cameron`,
    starring: [`Sam Worthington`, `Zoe Saldana`, `Sigourney Weaver`, `Stephen Lang`],
    runTime: 162,
    genre: `Action`,
    released: 2009,
    isFavorite: false
  },
  {
    id: 7,
    name: `Pulp Fiction`,
    posterImagePath: POSTER_IMAGE_URL,
    previewImagePath: PREVIEW_IMAGE_URL,
    backgroundImagePath: BACKGROUND_IMAGE_URL,
    backgroundColor: getRandomColor(),
    videoUrl: `${VIDEO_URL}?v=s7EdQ4FqbhY`,
    previewVideoUrl: `${PREVIEW_VIDEO_URL}?v=s7EdQ4FqbhY`,
    description: `The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`,
    rating: 8.9,
    score: 260,
    director: `Quentin Tarantino`,
    starring: [`Tim Roth`, `Amanda Plummer`, `Laura Lovelace`, `John Travolta`],
    runTime: 154,
    genre: `Crime`,
    released: 1994,
    isFavorite: true
  },
  {
    id: 8,
    name: `Revenant`,
    posterImagePath: POSTER_IMAGE_URL,
    previewImagePath: PREVIEW_IMAGE_URL,
    backgroundImagePath: BACKGROUND_IMAGE_URL,
    backgroundColor: getRandomColor(),
    videoUrl: `${VIDEO_URL}?v=LoebZZ8K5N0`,
    previewVideoUrl: `${PREVIEW_VIDEO_URL}?v=LoebZZ8K5N0`,
    description: `A young couple on the run from their past takes refuge in a mountain cabin said to be haunted by its own blood-soaked history. They soon discover that it's not the place they should be scared of but what they've brought with them.`,
    rating: 4.1,
    score: 278,
    director: `Randy Robinson`,
    starring: [`Chandler Bolt`, `Jesi Smith`, `LaTasha Williams`],
    runTime: 120,
    genre: `Drama`,
    released: 2008,
    isFavorite: true
  },
];
