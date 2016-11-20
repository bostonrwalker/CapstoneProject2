
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Subheader from 'material-ui/Subheader';

/*
A form for inputting vital statistics
*/

export default class WSInputVitalStats extends Component
{
	render()
	{
		return (
			<Paper
				zDepth={2}>
				<Subheader>
					Gender
				</Subheader>
				<RadioButtonGroup
					name="gender">
					<RadioButton
		        value="female"
		        label="Female"
		      />
					<RadioButton
		        value="male"
		        label="Male"
		      />
					<RadioButton
		        value="other"
		        label="Other/Prefer not to say"
		      />
				</RadioButtonGroup>
			</Paper>
			);		
	}
}

