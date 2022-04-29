import BeatLoader from "react-spinners/BeatLoader";
const SPINNER_COLOR = "#eee5b5";
const SPINNER_SIZE = 50;

const Spinner = ({ isLoading, color = SPINNER_COLOR, size = SPINNER_SIZE }) => {
  return <BeatLoader color={color} loading={isLoading} size={size} />;
};

export default Spinner;
