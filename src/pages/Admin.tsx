import { Button, Typography } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signIn, signOut, signUp } from '../firebase/authService';

const Admin = () => {
	const user = useLoggedInUser();

	return (
		<>
			<Typography>Admin page</Typography>
			{user ? (
				<>
					<Typography>Hello {user.email}</Typography>
					<Button onClick={signOut}>Test sign out</Button>
				</>
			) : (
				<>
					<Button onClick={() => signUp('admin@admin.com', 'adminadmin')}>
						Test Sign up
					</Button>
					<Button onClick={() => signIn('admin@admin.com', 'adminadmin')}>
						Test Login
					</Button>
				</>
			)}
		</>
	);
};

export default Admin;
