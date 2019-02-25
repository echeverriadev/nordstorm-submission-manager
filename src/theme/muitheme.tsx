
import { createMuiTheme } from '@material-ui/core/styles';

import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';


export const theme = createMuiTheme({
  palette: {
    primary: {
        light: '#757ce8',
        main: '#528cb7',
        dark: '#002884',
        contrastText: '#fff',
    },
    secondary: red
  },

  overrides: {
    MuiDrawer: {
      paper: {
        // background: '#cecece',
      },
    },
  },


});  

// export default theme;
//  principal: #528cb7
//  oscuro: #00628c
//  claro: #85b7e2
//  BOTON: #0093a0
//  font disable: #8fb9df
//  whitesmoke: f5f5f5
