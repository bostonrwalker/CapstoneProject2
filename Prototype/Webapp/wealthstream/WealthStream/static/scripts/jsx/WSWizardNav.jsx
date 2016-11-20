
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepContent, StepButton } from 'material-ui/Stepper';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import WSInputVitalStats from './WSInputVitalStats.jsx';
import WSTheme from './WSTheme.jsx';

/*
Helps the user navigate through the linear structure of the Wizard

Based on "drawer" nav menu, similar to the one used at http://www.material-ui.com
*/

export default class WSWizardNav extends Component
{
  stepCount = 3;

	constructor(props)
	{
    super(props);
	}

	renderStepTitle = (stepIndex) =>
	{
		if (stepIndex === 0)
		{
			return 'Vital stats';
		}
		else if (stepIndex === 1)
		{
			return 'Current finances';
		}
		else if (stepIndex === 2)
		{
			return 'Wealth goals';
		}
	}

  renderStepContent = (stepIndex) =>
  {
  	if (stepIndex === 0)
  	{
  		return (
  			<WSInputVitalStats/>
      );
  	}
  	else if (stepIndex === 1)
  	{
  		return (
    		<p>
    			$$
        </p>
      );
  	}
  	else if (stepIndex === 2)
  	{
  		return (
    		<p>
    			$$$$$
        </p>
      );
  	}
  }

  renderStep = (stepIndex) =>
  {
  	var isFinish = stepIndex === (this.stepCount - 1);

		return (
			<Step>
      	<StepButton
      		onClick={() => this.props.fnSetStepIndex(stepIndex)}>
      		
      		{this.renderStepTitle(stepIndex)}

    		</StepButton>
      	<StepContent>

      		{this.renderStepContent(stepIndex)}

		      <div style={{margin: '12px 0'}}>
		        <RaisedButton
		          label={isFinish ? 'Finish' : 'Next'}
		          disableTouchRipple={true}
		          disableFocusRipple={true}
		          primary={true}
		          onTouchTap={isFinish ?
		          	() => this.props.fnOnFinish() :
		          	() => this.props.fnSetStepIndex(stepIndex + 1)}
		          style={{marginRight: 12}}
		        />
		        {stepIndex > 0 && (
		          <FlatButton
		            label="Back"
		            disabled={stepIndex === 0}
		            disableTouchRipple={true}
		            disableFocusRipple={true}
		            onTouchTap={() => this.props.fnSetStepIndex(stepIndex - 1)}
		          />
		        )}
		      </div>
      	</StepContent>
			</Step>
    );
  }

	render()
	{
		return (
			<MuiThemeProvider muiTheme={WSTheme}>
				<Drawer 
					className="WSWizardNav"
					width={544}
					open={this.props.open}
					docked={false}
					onRequestChange={this.props.onRequestChange}>
  				<AppBar
  					title="WealthStream"
  					showMenuIconButton={false}/>
  				<Stepper
  					linear={false}
  					activeStep={this.props.stepIndex}
  					orientation="vertical">

  					{this.renderStep(0)}
  					{this.renderStep(1)}
  					{this.renderStep(2)}

  				</Stepper>
				</Drawer>
			</MuiThemeProvider>
		);
	}
}
