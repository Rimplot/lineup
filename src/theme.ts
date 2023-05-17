import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = responsiveFontSizes(
	createTheme({
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					// Css rule that makes sure app is always 100% height of window
					'body, #root': {
						display: 'flex',
						flexDirection: 'column',
						minHeight: '100vh'
					}
				}
			},
			MuiIconButton: {
				styleOverrides: {
					root: {
						'fill': '#606060',
						'backgroundColor': 'white',
						'opacity': 0.8,
						'&:hover': {
							backgroundColor: 'white',
							opacity: 1
						}
					}
				}
			}
		}
	})
);

export default theme;
