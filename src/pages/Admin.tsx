import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	IconButton,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Timestamp, onSnapshot } from 'firebase/firestore';
import { Delete } from '@mui/icons-material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signIn, signOut, signUp } from '../firebase/authService';
import {
	Concert,
	concertsCollection,
	createConcert,
	deleteConcert
} from '../firebase/concertsService';
import ConcertForm from '../components/ConcertForm';

const Admin = () => {
	const user = useLoggedInUser();

	const [concerts, setConcerts] = useState<Concert[]>([]);

	useEffect(
		() =>
			onSnapshot(concertsCollection, snapshot =>
				setConcerts(snapshot.docs.map(doc => doc.data()))
			),
		[]
	);

	const handleClick = async () => {
		await createConcert({
			date: Timestamp.now(),
			stage: 'Main Stage',
			artist: {
				name: 'Timmy Trumpet',
				shortDescription:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas metus nisi, a facilisis lacus commodo id. In laoreet suscipit lorem in vulputate.',
				fullDescription:
					'Quisque gravida orci eget ante maximus congue. Aliquam scelerisque arcu sit amet turpis tempor mattis id quis massa. Nullam eleifend tristique lacus tempor venenatis. Morbi gravida cursus quam, sed euismod felis ultrices in. Mauris imperdiet ac purus nec pharetra. Duis consequat posuere nisi vel blandit.',
				imageUrl: 'image url'
			}
		});
	};

	return (
		<>
			<Typography>Admin page</Typography>
			{user ? (
				<>
					<Typography>Hello {user.email}</Typography>
					<Button onClick={signOut}>Test sign out</Button>
					<Button onClick={handleClick}>Add Concert</Button>
					<ConcertForm onSubmit={createConcert} />
					{!!concerts.length && (
						<Box
							sx={{
								display: 'flex',
								gap: 2,
								flexDirection: 'row',
								flexWrap: 'wrap'
							}}
						>
							<Typography>Concerts list</Typography>
							{concerts.map(c => (
								<Card key={c.date.seconds}>
									<CardContent>
										<Typography fontWeight="bold">{c.artist.name}</Typography>
										<Typography fontWeight="bold">{c.stage}</Typography>
										<Typography fontWeight="bold">
											{c.date.toDate().toLocaleString()}
										</Typography>
										<Divider sx={{ my: 2 }} />
										<Typography fontWeight="bold">
											{c.artist.shortDescription}
										</Typography>
									</CardContent>
									<CardActions>
										<IconButton
											onClick={() => deleteConcert(c.id!)}
											color="error"
											title="Delete"
										>
											<Delete />
										</IconButton>
									</CardActions>
								</Card>
							))}
						</Box>
					)}
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
