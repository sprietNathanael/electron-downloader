import { Button, createStyles, Grid, TextField, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import { Pause, Play } from 'mdi-material-ui';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import DownloadEntry from '../../../Common/DownloadEntry';

const styles = (theme: Theme) => createStyles({});

interface ComponentProps extends RouteComponentProps, WithStyles<typeof styles> {}

// type ComponentState = Record<string, never>;
type ComponentState = {
	url: string;
	registeredDownloads: DownloadEntry[];
};

class OnGoingView extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);
		this.state = {
			url: '',
			registeredDownloads: [],
		};
		window.ipcApi.downloadControl.receive('downloadProgressUpdate', this.progressReceived);
		window.ipcApi.downloadControl.receive('downloadRegistered', this.downloadRegistered);
		window.ipcApi.downloadControl.receive('downloadInfoUpdate', this.downloadInfoReceived);
		// console.log(process.resourcesPath);
	}

	url_change = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			url: event.target.value,
		});
	};

	loadUrl = () => {
		window.ipcApi.downloadControl.send('beginDownload', {
			url: 'http://speedtest.ftp.otenet.gr/files/test10Mb.db',
			localPath: '/home/nathanael/tmp/dummy100k',
		});
	};

	progressReceived = (data: DownloadEntry) => {
		console.log(`PROGRESS for ${data.url} = ${data.progress}`);
		let registeredDownloads = this.state.registeredDownloads;
		let downloadToUpdateIndex = registeredDownloads.findIndex((el) => el.uuid === data.uuid);
		registeredDownloads[downloadToUpdateIndex] = data;
		this.setState({ registeredDownloads });
	};

	downloadInfoReceived = (data: DownloadEntry) => {
		console.log(`Download ${data.url} = ${data.size}`);

		let registeredDownloads = this.state.registeredDownloads;
		let downloadToUpdateIndex = registeredDownloads.findIndex((el) => el.uuid === data.uuid);
		registeredDownloads[downloadToUpdateIndex] = data;
		this.setState({ registeredDownloads });
	};
	downloadRegistered = (data: DownloadEntry) => {
		let registeredDownloads = this.state.registeredDownloads;
		registeredDownloads.push(data);
		this.setState({ registeredDownloads });
		console.log(`Download registered as ${data.uuid}`);
	};

	pauseDownload = (uuid: string) => (event: any) => {
		window.ipcApi.downloadControl.send('pauseDownload', uuid);
	};

	resumeDownload = (uuid: string) => (event: any) => {
		window.ipcApi.downloadControl.send('resumeDownload', uuid);
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
				{this.state.registeredDownloads.map((download) => (
					<Grid item xs={12} key={download.uuid}>
						<Typography variant='body1'>
							{download.localPath} : {download.progress} B /{download.size} B
						</Typography>
						{download.status === 'ongoing' ? (
							<Button onClick={this.pauseDownload(download.uuid)}>
								<Pause />
							</Button>
						) : (
							<Button onClick={this.resumeDownload(download.uuid)}>
								<Play />
							</Button>
						)}
					</Grid>
				))}
			</Grid>
		);
	}
}

export default withStyles(styles)(withRouter(OnGoingView));
