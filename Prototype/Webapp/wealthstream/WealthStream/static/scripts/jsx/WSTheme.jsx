
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const WSTheme = getMuiTheme({
	appBar: {
    height: 48
  },
  palette: {
  	primary1Color: "#00897B",
  	canvasColor: "#CFD8DC",
  	textColor: "#263238",
  	secondaryTextColor: "#FFFFFF",
    alternateTextColor: "#FFFFFF"
  }
});

console.log(WSTheme);

export default WSTheme;

