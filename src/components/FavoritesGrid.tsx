import { Typography } from '@mui/material';

import { Concert } from '../firebase/concertsService';
import useFavorites from '../hooks/useFavorites';

import PerformersGrid from './PerformersGrid';

type FavoritesGridProps = {
	concerts: Array<Concert>;
};

const FavoritesGrid = ({ concerts }: FavoritesGridProps) => {
	const { favorites, isFavorite } = useFavorites();

	return favorites.length > 0 ? (
		<>
			<Typography variant="h3" my={4}>
				Your favorites
			</Typography>
			<PerformersGrid concerts={concerts.filter(c => isFavorite(c.id!))} />
		</>
	) : (
		<></>
	);
};

export default FavoritesGrid;
