// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import globalTheme from './globalTheme';
import './i18n';
import './index.css';
import Layout from './Layout/Layout';

ReactDOM.render(
	<MuiThemeProvider theme={globalTheme}>
		<Layout theme={globalTheme} />
	</MuiThemeProvider>,
	document.getElementById('root')
);
