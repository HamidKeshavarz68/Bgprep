import React from 'react';
import {CFullPage,CFulPageSlide} from './components/CFullPage'
import CSearchPage from "./components/CSearchPage"
import CReportPage from "./components/CReportPage"
import CResources from "./components/CResources"
import CDownload from "./components/CDownload"
import CAbout from "./components/CAbout"

//import './App.css';

function App() {
  
  return (
      <CFullPage brand="IP Geo" icon="flaticon-world-location">
          <CFulPageSlide label="Home">
            <CSearchPage/>
          </CFulPageSlide>
          <CFulPageSlide label="Report">
            <CReportPage/>
          </CFulPageSlide>
          <CFulPageSlide label="Resources">
            <CResources/>
          </CFulPageSlide>
          <CFulPageSlide label="Download">
            <CDownload/>
          </CFulPageSlide>
          <CFulPageSlide label="About">
              <CAbout/>
          </CFulPageSlide>
      </CFullPage>    
  )

}

export default App;
