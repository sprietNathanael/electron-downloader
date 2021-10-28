interface StatusTheme {
	success: string;
	warning: string;
	error: string;
	disabled: string;
}

interface ButtonTheme {
	close: string;
}

declare module '@material-ui/core/styles' {
	interface Theme {
		status: StatusTheme;
		buttons: ButtonTheme;
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: StatusTheme;
		buttons?: ButtonTheme;
	}
}

import { amber, green, grey, orange, red } from '@material-ui/core/colors/';
import { createTheme } from '@material-ui/core/styles';

export default createTheme({
	palette: {
		type: 'dark',
		primary: {
			main: grey[600],
		},
		secondary: {
			main: orange['500'],
			contrastText: '#FFFFFF',
		},
		error: red,
		// Used by `getContrastText()` to maximize the contrast between the background and
		// the text.
		contrastThreshold: 3,
		// Used to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
	status: {
		success: green[600],
		warning: amber[700],
		error: red[700],
		disabled: grey[400],
	},
	buttons: {
		close: red[400],
	},
	typography: {
		fontFamily: ['Roboto', 'sans-serif'].join(','),
		h1: {
			fontSize: '3rem',
		},
		h2: {
			fontSize: '2rem',
		},
		h3: {
			fontSize: '1.5rem',
		},
		h4: {
			fontSize: '1.2rem',
		},
	},
});
