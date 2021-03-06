import { Typography } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type ComponentProps = RouteComponentProps;

type ComponentState = Record<string, never>;

class Test2 extends React.Component<ComponentProps, ComponentState> {
	goToPage1 = () => {
		this.props.history.push('/test1');
	};
	render() {
		return (
			<div>
				<Typography color='inherit'>Test 2</Typography> <button onClick={this.goToPage1}>Test1</button>
			</div>
		);
	}
}

export default withRouter(Test2);
