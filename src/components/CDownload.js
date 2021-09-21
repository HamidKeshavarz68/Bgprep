import './CDownload.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import React from 'react';
import { Container,Table,Row,Col} from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import $ from 'jquery'
class CDownload extends React.Component {
    state={fileNames:null}
    //--------------------------------------------------------------------------------
    render(){   

        if(this.state.fileNames===null){
            return(
                <Loader 
                className="CAppPageLoad"
                type="Bars"
                color="green"
                height={100}
                width={100}/>)
        }

        return(
        
            <Container style={{paddingTop:"1%"}}>
                <Row>
                    <Col>
                        <h3>Offline Database</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Hash (SHA1)</th>
                                    <th>Format</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.fileNames.map((obj,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td><a href={obj.url}>{obj.name}.tar.gz</a></td>
                                            <td>{obj.hash}</td> 
                                            <td>{obj.format}</td>
                                            <td>{obj.description}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                            <h3>Rest API</h3>
                            <p>
                                Besides offline databases, you can use our REST API. Please consider it is a free service without any warranty.<br/>
                                Here is an example call illustrating how to use our REST API. 
                            </p>
                            <code>
                                https://bgprep.info/api/search?value=1.1.1.1
                            </code>
                            <p>
                                <br/>
                                API call delivers results in JSON format.    
                            </p>
                    </Col>
                </Row>
            </Container>)
    }
    //--------------------------------------------------------------------------------
    componentDidMount(){
        $.ajax({
            url: '/api/files',
            dataType: 'json',
            success: (res) => {
                let state=this.state;
                state.fileNames=res;
                this.setState(state)
            },
            error: (err) => {
                alert(`can not get files list`)
            },
        });
    }
}
export default CDownload