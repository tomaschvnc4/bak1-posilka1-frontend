import { createMuiTheme } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

const themeGreenRed = createMuiTheme({
   palette: {
      primary: green,
      secondary: red,
   },
});

export default themeGreenRed;
