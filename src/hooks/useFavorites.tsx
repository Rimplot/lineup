import {
	useState,
	useCallback,
	createContext,
	PropsWithChildren,
	useContext
} from 'react';

type FavContextType = {
	favorites: Array<string>;
	addFavorite: (newFav: string) => void;
	removeFavorite: (toRemove: string) => void;
	isFavorite: (isFavorite: string) => boolean;
};

const FavoritesContext = createContext<FavContextType>(undefined as never);

const LOCAL_STORAGE_KEY = 'favorite_concerts';

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
	// We can improve this by saving and loading the initial state from local storage
	const [favorites, setFavorites] = useState(() => {
		const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
		return JSON.parse(saved ?? '[]') as Array<string>;
	});

	const addFavorite = useCallback(
		(newFav: string) => {
			if (favorites.includes(newFav)) return;

			const newState = [...favorites, newFav];
			setFavorites(newState);
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
		},
		[favorites]
	);

	const removeFavorite = useCallback(
		(toRemove: string) => {
			const newFavorites = favorites.filter(f => f !== toRemove);
			setFavorites(newFavorites);
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
		},
		[favorites]
	);

	const isFavorite = useCallback(
		(id: string) => favorites.includes(id),
		[favorites]
	);

	return (
		<FavoritesContext.Provider
			value={{ favorites, addFavorite, removeFavorite, isFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

const useFavorites = () => useContext(FavoritesContext);

export default useFavorites;
