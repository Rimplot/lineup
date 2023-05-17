import {
	Link,
	Outlet,
	RootRoute,
	Route,
	Router,
	RouterProvider
} from '@tanstack/react-router';
import './App.css';
import {
	AppBar,
	Container,
	CssBaseline,
	ThemeProvider,
	Toolbar
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import theme from './theme';
import Home from './pages/Home';
import Concert from './pages/Concert';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { UserProvider } from './hooks/useLoggedInUser';
import { FavoritesProvider } from './hooks/useFavorites';

const rootRoute = new RootRoute({
	component: () => (
		<ThemeProvider theme={theme}>
			<FavoritesProvider>
				<CssBaseline />

				<AppBar position="sticky">
					<Container>
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<Link to="/concert">Concert</Link>
						</Toolbar>
					</Container>
				</AppBar>

				<Outlet />
			</FavoritesProvider>
		</ThemeProvider>
	)
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Home
});

const concertRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/concert',
	component: Concert
});

const adminRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/admin',
	component: Admin
});

const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: NotFound
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	concertRoute,
	adminRoute,
	notFoundRoute
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => (
	<LocalizationProvider dateAdapter={AdapterDayjs}>
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	</LocalizationProvider>
);

export default App;
