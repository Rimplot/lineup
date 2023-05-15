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
import { Schedule } from '@mui/icons-material';

import theme from './theme';
import Home from './pages/Home';
import Concert from './pages/Concert';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { UserProvider } from './hooks/useLoggedInUser';
import ButtonLink from './components/ButtonLink';
import Detail from './pages/Detail';
import About from './pages/About';
import { LanguageProvider, useTranslation } from './hooks/useTranslation';
import LanguageSwitch from './components/LanguageSwitch';

const rootRoute = new RootRoute({
	component: () => {
		const t = useTranslation();
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppBar sx={{ position: 'sticky', width: '100%' }}>
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<ButtonLink to="/">{t('home')}</ButtonLink>
							<ButtonLink to="/concert">{t('concert')}</ButtonLink>
							<ButtonLink to="/detail">{t('detail')}</ButtonLink>
							<ButtonLink to="/schedule">{t('schedule')}</ButtonLink>
							<ButtonLink to="/about">{t('about')}</ButtonLink>
							<LanguageSwitch />
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
		);
	}
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

const detailRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/detail',
	component: Detail
});

const scheduleRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/schedule',
	component: Schedule
});

const aboutRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/about',
	component: About
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
	detailRoute,
	scheduleRoute,
	aboutRoute,
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
			<LanguageProvider>
				<RouterProvider router={router} />
			</LanguageProvider>
		</UserProvider>
	</LocalizationProvider>
);

export default App;
