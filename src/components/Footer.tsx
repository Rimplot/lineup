import { Box, Container, Paper, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';

import Logo from '../assets/music-fav.svg';

const Footer = () => (
	<Paper
		sx={{ marginTop: '10vh', height: '10vh', bottom: 0 }}
		component="footer"
		square
		variant="outlined"
	>
		<Container maxWidth="lg">
			<Box
				sx={{
					flexGrow: 1,
					justifyContent: 'center',
					display: 'flex',
					my: 1
				}}
			>
				<Link href="/">
					<img src={Logo} width={75} height={30} alt="Logo" />
				</Link>
			</Box>

			<Box
				sx={{
					flexGrow: 1,
					justifyContent: 'center',
					display: 'flex',
					mb: 2
				}}
			>
				<Typography variant="caption" style={{ color: '#aaaaaa' }}>
					Copyright ©2023.{' '}
					<a
						href="https://github.com/Rimplot/lineup"
						target="_blank"
						rel="noreferrer"
						style={{ color: '#aaaaaa' }}
					>
						GitHub.
					</a>{' '}
					<Link to="/admin" style={{ color: '#aaaaaa' }}>
						Admin.
					</Link>
				</Typography>
			</Box>
		</Container>
	</Paper>
);

export default Footer;
