import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Accessibility from 'material-ui/svg-icons/action/accessibility'
import LinearProgress from 'material-ui/LinearProgress';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import WSTheme from './WSTheme.jsx';

export default class WSGoalEditor extends Component
{
	constructor(props)
	{
		super(props)
	}

	renderGoalItems()
	{
		var items = [];
		this.props.parameters.goals.forEach((goal) => {
			items.push(
				<ListItem
					primaryText={goal.name}
					key={goal.name}>
					<LinearProgress
						mode="determinate"
						value={100*goal.progress}/>
				</ListItem>
			);
		});
		return items;
	}

	render()
	{
		return (
			<MuiThemeProvider muiTheme={WSTheme}>
				<Card>
					<CardHeader
			      title="Goals"
			      avatar={<Accessibility/>}
			    	/>
			    <CardMedia>
						<List>
							{this.renderGoalItems()}
						</List>
					</CardMedia>
				</Card>
			</MuiThemeProvider>
		);
	}
}