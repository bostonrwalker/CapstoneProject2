
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const WSTheme = getMuiTheme({
	appBar: {
    height: 48
  },
  palette: {
  	primary1Color: "#00897B",
  	canvasColor: "#F0FAFF",
  	textColor: "#263238",
  	secondaryTextColor: "#F0FAFF",
    alternateTextColor: "#F0FAFF"
  }
});

console.log(WSTheme);

export default WSTheme;

