
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppBar } from 'material-ui';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WSTheme from './WSTheme.jsx';

/*
Top bar

Button on the left to show/hide wizard nav
*/
export default class WSAppBar extends Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<MuiThemeProvider muiTheme={WSTheme}>
				<AppBar
					className="wsAppBar"
					onLeftIconButtonTouchTap={this.props.onClickToggleBtn}/>
			</MuiThemeProvider>
		);
	}
}
