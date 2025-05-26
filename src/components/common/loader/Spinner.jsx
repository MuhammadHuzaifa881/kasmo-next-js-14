import CircularProgress from '@mui/material/CircularProgress';

const Spinner = ({ size = 30, thickness = 4 }) => {
  return <CircularProgress size={size} thickness={thickness} />;
};

export default Spinner;
