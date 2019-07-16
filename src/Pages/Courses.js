import React, { Component, Fragment } from 'react';
import { Scatter, Header, Footer } from '../Components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4682b4',
    }
  },
});

class Courses extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Fragment>
          <Header/>
            <div className="App">
              <Scatter />
            </div>
          <Footer/>
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Courses;
