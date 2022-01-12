import { Button, Grid, Typography } from '@mui/material/';
import { Tractor } from 'mdi-material-ui';
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withStyles } from '../../makeStyles';

interface ComponentProps extends WithTranslation, RouteComponentProps {
	classes?: any;
}
type ComponentState = Record<string, never>;

class Test1 extends React.Component<ComponentProps, ComponentState> {
	goToPage2 = () => {
		this.props.history.push('/test2');
	};
	render() {
		const { classes, t } = this.props;
		return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography className={classes.error}>Test 1</Typography>
					<Typography className={'success'}>Test 1</Typography>
					<Typography className={'success'}>{t('test')}</Typography>
					<Button variant='contained' onClick={this.goToPage2}>
						<Tractor />
						Test2
					</Button>
				</Grid>
			</Grid>
		);
	}
}
export default withTranslation()(
	withStyles(withRouter(Test1), (theme) => {
		return {
			error: {
				color: theme.status.error,
			},
		};
	})
);
