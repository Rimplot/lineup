import { Box, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const NotFound = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: '5rem'
		}}
	>
		<WarningIcon sx={{ typography: 'h1' }} />
		<Typography variant="h2">Not found</Typography>
		<Typography>Oops, looks like this page does not exist</Typography>
	</Box>
);

export default NotFound;
