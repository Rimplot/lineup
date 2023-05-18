import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { signIn } from '../firebase/authService';

// type AdminProps = {};

const AdminLogin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignIn = async () => {
		try {
			setError('');
			await signIn(email, password);
		} catch (error) {
			setError('Incorrect email or password.');
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignContent: 'center',
				minWidth: '300px',
				gap: 1
			}}
		>
			<TextField
				type="email"
				label="Email"
				variant="outlined"
				value={email}
				fullWidth
				onChange={e => setEmail(e.target.value)}
			/>
			<TextField
				type="password"
				label="Password"
				variant="outlined"
				value={password}
				onChange={e => setPassword(e.target.value)}
				fullWidth
			/>
			{error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingTop: '1rem',
					gap: 1
				}}
			>
				<Button variant="contained" onClick={handleSignIn}>
					Login
				</Button>
				<Button
					variant="contained"
					onClick={() => signIn('admin@admin.com', 'adminadmin')}
				>
					Test Login
				</Button>
			</Box>
		</Box>
	);
};

export default AdminLogin;
