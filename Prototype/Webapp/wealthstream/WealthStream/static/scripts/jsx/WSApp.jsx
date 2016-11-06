// Temporary dependency
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import getMuiTheme from 'material-ui/styles/getMuiTheme';

import WSAppBar from './WSAppBar.jsx';
import WSWizardNav from './WSWizardNav.jsx';

class WSApp extends Component
{
	constructor(props)
	{
		super(props);

		// This is where the entire state of the UI will be kept
		this.state = {
			isWizardNavOpen: false,
			wizardNavStepIndex: 0
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
	    </div>
	);
	}
}

ReactDOM.render(
	<WSApp/>,
  	document.getElementById('wsAppContainer')
);
