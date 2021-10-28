import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import Layout from './Layout/Layout';
import globalTheme from './views/globalTheme';

ReactDOM.render(
	<MuiThemeProvider theme={globalTheme}>
		<Layout />
	</MuiThemeProvider>,
	document.getElementById('root')
);
