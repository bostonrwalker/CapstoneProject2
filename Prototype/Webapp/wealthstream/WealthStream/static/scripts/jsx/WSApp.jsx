// Temporary dependency
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import getMuiTheme from 'material-ui/styles/getMuiTheme';

import WSAppBar from './WSAppBar.jsx';
import WSWizardNav from './WSWizardNav.jsx';
import WSExplorer from './WSExplorer.jsx';

class WSApp extends Component
{
	constructor(props)
	{
		super(props);

		// This is where the entire state of the UI will be kept
		this.state = {
			isWizardNavOpen: false,
			wizardNavStepIndex: 0,
			parameters: {
				goals: [
					{
						name: 'Car cash',
						progress: 0.89
					},
					{
						name: 'Pay down mortgage',
						progress: 0.25
					}
				]
			},
			model: {
				assets: [
					{
						name: 'Stocks',
						data: [1.25, 1.52, 1.81, 2.56, 2.90]
					},
					{
						name: 'Bonds',
						data: [0.91, 0.95, 1.00, 1.05, 1.10]
					},
					{
						name: 'Cash',
						data: [0.1, 0.1, 0.1, 0.1, 0.11]
					}
				]
			}
		};

		// this.toggleWizardNav = this.toggleWizardNav.bind(this);
		// this.wizardGotoNextStep = this.wizardGotoNextStep.bind(this);
		// this.wizardGotoPrevStep = this.wizardGotoPrevStep.bind(this);
	}

	toggleWizardNav = () =>
	{
		this.setState({isWizardNavOpen: !this.state.isWizardNavOpen});
  }	

	closeWizardNav = () =>
	{
		this.setState({isWizardNavOpen: false})
	}

	wizardSetStep = (stepIndex) =>
	{
		this.setState({wizardNavStepIndex: stepIndex});
	}

	wizardFinish = () =>
	{
		this.closeWizardNav();
	}

	render()
	{
		return (
			<div>
		    <WSAppBar
		    	ref="wsAppBar"
		    	onClickToggleBtn={this.toggleWizardNav}/>
		    <WSWizardNav
		    	ref="wsWizardNav"
		    	open={this.state.isWizardNavOpen}
		    	stepIndex={this.state.wizardNavStepIndex}
		    	onRequestChange={this.toggleWizardNav}
		    	fnSetStepIndex={this.wizardSetStep}
		    	fnOnFinish={this.wizardFinish}/>
		    <WSExplorer
		    	parameters={this.state.parameters}
		    	model={this.state.model}/>
	    </div>
	);
	}
}

ReactDOM.render(
	<WSApp/>,
  	document.getElementById('wsAppContainer')
);
