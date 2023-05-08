import {
	Link,
	Outlet,
	RootRoute,
	Route,
	Router,
	RouterProvider
} from '@tanstack/react-router';
import {
	AppBar,
	Container,
	CssBaseline,
	ThemeProvider,
	Toolbar
} from '@mui/material';

import './App.css';

import theme from './theme';
import Home from './pages/Home';
import Concert from './pages/Concert';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { UserProvider } from './hooks/useLoggedInUser';

const rootRoute = new RootRoute({
	component: () => (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<AppBar sx={{ position: 'sticky', width: '100%' }}>
				<Container maxWidth="sm">
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<Link to="/concert">Concert</Link>
					</Toolbar>
				</Container>
			</AppBar>

			<Container
				maxWidth="sm"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					flexGrow: 1,
					gap: 2,
					my: 4
				}}
			>
				<Outlet />
			</Container>
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
	<UserProvider>
		<RouterProvider router={router} />;
	</UserProvider>
);

export default App;
