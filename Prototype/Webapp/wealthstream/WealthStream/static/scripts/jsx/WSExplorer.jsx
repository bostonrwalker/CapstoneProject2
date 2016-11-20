
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Grid, Row, Col } from 'react-bootstrap';

import WSGoalEditor from './WSGoalEditor.jsx';
import WSWealthChart from './WSWealthChart.jsx';

export default class WSExporer extends Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return(
			<Grid>
				<Row>
					<Col xs={12} md={6}>
						<WSGoalEditor
							parameters={this.props.parameters}/>
					</Col>
					<Col xs={12} md={6}>
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={12}>
						<WSWealthChart
							model={this.props.model}/>
					</Col>
				</Row>
			</Grid>
		);
	}
}