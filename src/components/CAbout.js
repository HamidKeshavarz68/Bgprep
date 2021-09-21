import "./CAbout.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Container,Navbar} from 'react-bootstrap'

class CAbout extends React.Component {
    //--------------------------------------------------------------------------------
    render(){
        return(

            <Container style={{maxWidth:"40%",paddingTop:"1%"}}>
                <h3>About</h3>
                <p >
                This tiny web-app is the result of collecting, normalizing, and categorizing more than 500 IP-sets from different resources. Some of the resources are highly reputed, and some of them are unofficial IP-sets obtained from personal weblogs (including my Honeypot servers). Besides this, I also maintain my Location and BGP DB. All this data is updated regularly (currently weekly).  
                I am actively seeking new resources and try to check and add them to my robot. Please let me know if you have or know any IP-set.
                </p>
                <p>
                    Please note that I only collect and process the data, and  I am not responsible for the result. 
                </p>
                <p>
                    Please don't hack or spam this site; everything is available freely. If you need more, please be polite and contact me via 
                    <a href="https://www.linkedin.com/in/mohsen-atiq"> Linkedin</a> or my <a href="https://twitter.com/mohsenatigh">twitter</a> 
                </p>
                <Navbar fixed="bottom">
                    <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </Navbar>
            </Container>

        )        
    }
}

export default CAbout