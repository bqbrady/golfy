import React, { Component, Fragment } from 'react';
import { Price, Header, Footer } from '../Components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4682b4',
    }
  },
});

class Home extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Fragment>
          <Header/>
            <div align="center" className="App">
              <Price />
            </div>
          <Footer/>
        </Fragment>
      </MuiThemeProvider>
    );
  }
}
export default Home;
