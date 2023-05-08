import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

// import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => (
	// usePageTitle();
	<>
		<WarningIcon sx={{ typography: 'h1' }} />
		<Typography variant="h2">Not found</Typography>
		<Typography>Oops, looks like this page does not exist</Typography>
	</>
);
export default NotFound;
