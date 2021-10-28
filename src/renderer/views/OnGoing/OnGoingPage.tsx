import { Button, createStyles, Grid, TextField, Theme, withStyles, WithStyles } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({});

interface ComponentProps extends RouteComponentProps, WithStyles<typeof styles> {}

// type ComponentState = Record<string, never>;
type ComponentState = {
	url: string;
};

class OnGoingView extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);
		this.state = {
			url: '',
		};
		window.ipcApi.downloadControl.receive('downloadProgress', this.progressReceived);
	}

	url_change = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			url: event.target.value,
		});
	};

	loadUrl = () => {
		window.ipcApi.downloadControl.send('beginDownload', 'machin');
	};

	progressReceived = (data: { url: string; progress: number }) => {
		console.log(`PROGRESS for ${data.url} = ${data.progress}`);
	};
	render() {
		const { classes } = this.props;
		return (
			<Grid container spacing={2}>
				<Grid item>
					<TextField value={this.state.url} onChange={this.url_change} margin='normal' variant='filled' />
				</Grid>
				<Grid item>
					<Button onClick={this.loadUrl}>Go</Button>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(withRouter(OnGoingView));
