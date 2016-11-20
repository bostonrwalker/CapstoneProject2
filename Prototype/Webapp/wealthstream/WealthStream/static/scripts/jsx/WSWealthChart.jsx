import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import ShowChart from 'material-ui/svg-icons/editor/show-chart'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import WSTheme from './WSTheme.jsx';

import Highcharts from 'highcharts';

export default class WSWealthChart extends Component
{
	constructor(props)
	{
		super(props)
	}

  componentDidMount = () =>
  {
		// Extend Highcharts with modules
		if (this.props.modules) {
			this.props.modules.forEach(function (module) {
				module(Highcharts);
			});
		}
		// Set container which the chart should render to.
		this.chart = new Highcharts.Chart(
			'WealthChart', 
			this.getChartOptions(this.props.model)
		);
	}

	componentWillUnmount = () =>
	{
		this.chart.destroy();
	}

	getChartOptions = (model) =>
	{
		return {
			chart: {
        type: 'column'
      },
      title: {
        text: 'Stacked column chart'
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },
      yAxis: {
        min: 0,
        title: {
	        text: 'Total fruit consumption'
	      },
	      stackLabels: {
	        enabled: true,
	        style: {
	          fontWeight: 'bold',
	          color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	        }
	      }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
	      column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
          }
	      }
      },
      series: model.assets
		}
	}

	render()
	{
		return (
			<MuiThemeProvider muiTheme={WSTheme}>

				<Card>
					<CardHeader
			      title="Projections"
			      avatar={<ShowChart/>}
			    	/>
			    <CardMedia>
						<div id="WealthChart"></div>
					</CardMedia>
				</Card>
			</MuiThemeProvider>
		);
	}
}
