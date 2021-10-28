import { Button, createStyles, Grid, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import { Tractor } from 'mdi-material-ui';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const styles = (theme: Theme) =>
	createStyles({
		error: {
			color: 'red',
		},
		machin: {
			color: theme.status.success,
		},
	});

interface ComponentProps extends RouteComponentProps, WithStyles<typeof styles> {
	test: string;
}

type ComponentState = Record<string, never>;

class Test1 extends React.Component<ComponentProps, ComponentState> {
	goToPage2 = () => {
		this.props.history.push('/test2');
	};
	render() {
		const { classes } = this.props;
		return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography className={classes.error}>Test 1</Typography>
					<Typography className={'success'}>Test 1</Typography>
					<Typography className={classes.machin}>Test 1</Typography>
					<Button variant='contained' onClick={this.goToPage2}>
						<Tractor />
						Test2
					</Button>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(withRouter(Test1));
// export default withTranslation()(withStyles(styles)(withRouter(Test1)));
// export default withRouter(Test1);
