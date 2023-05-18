import { Box, Container, Link, Paper, Typography } from '@mui/material';
import Logo from '../assets/music-fav.svg';

interface FooterProps {}

const Footer = ({}: FooterProps) => (
	<Paper
		sx={{ marginTop: 'calc(10% + 60px)', bottom: 0 }}
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
				<Typography
					variant="caption"
					color="initial"
					style={{ color: '#aaaaaa' }}
				>
					Copyright ©2023. <Link href='https://github.com/Rimplot/lineup'>GitHub.</Link> <Link href='/admin'>Admin.</Link>
				</Typography>
			</Box>
		</Container>
	</Paper>
);

export default Footer;
