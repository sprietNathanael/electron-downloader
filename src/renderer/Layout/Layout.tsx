// import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
// import { withStyles } from '@renderer/makeStyles';
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyles } from 'tss-react';
import { withStyles } from '../makeStyles';
import mainRoutes from '../routes/mainRoutes';

interface ComponentProps extends WithTranslation {
	theme?: any;
	classes?: any;
}

// type ComponentProps = WithStyles<typeof styles>;

type ComponentState = Record<string, never>;

class App extends React.Component<ComponentProps, ComponentState> {
	switchRoutes = (passedProps: any): React.ReactElement => {
		const toReturn = (
			<Switch>
				{mainRoutes.map((prop, key) => {
					return (
						<Route
							key={key}
							path={prop.path}
							render={(props) => <prop.component {...props} {...passedProps} />}
						/>
					);
				})}
			</Switch>
		);
		return toReturn;
	};

	//============== Notifier ====================

	//======================= Page Render ========================

	render(): React.ReactElement {
		const { classes } = this.props;
		return (
			<div className={classes.app}>
				<GlobalStyles
					styles={{
						'.success': {
							color: this.props.theme.status.success,
							// color: 'green',
						},
					}}
				/>
				{/* <TitleBar /> */}
				<div className={classes.mainPage}>
					<HashRouter>{this.switchRoutes({})}</HashRouter>
				</div>
			</div>
		);
	}
}

// export default withStyles(styles)(App);

export default withTranslation()(
	withStyles(App, (theme) => ({
		app: {
			display: 'flex',
			backgroundColor: theme.palette.background.default,
			height: '100vh',
			machin: 'truc',
		},
		mainPage: {
			position: 'absolute',
			width: '100%',
			// top: '29px',
			height: '100vh',
			// height: 'calc(100vh - 29px)',
			// flexGrow: 1,
			// paddingBottom: 0,

			// height: '97vh',
			// overflowY: 'auto',
			overflow: 'hidden',
		},
	}))
);
