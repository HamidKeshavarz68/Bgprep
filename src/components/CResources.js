import './CResources.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../fonts/flaticon.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import React from 'react';
import { Container,Table } from 'react-bootstrap'
import $ from 'jquery'
import Loader from 'react-loader-spinner'

class CResources extends React.Component {
    state={info:null}
    //--------------------------------------------------------------------------------
    render(){

        if (this.state.info===null){
            return(
                <Loader 
                className="CResourcePageLoad"
                type="Oval"
                color="green"
                height={100}
                width={100}/>)
        }


        return (
            <Container className="CResourcePage">
                <Table>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Resource
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.info.map((obj,index)=>{
                            if(obj.includes("personal blacklist")){
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{obj}</td>
                                    </tr>
                                )
                            }


                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td><a href={`https://${obj}`}>{obj}</a></td>
                                </tr>
                            )     
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }
    //--------------------------------------------------------------------------------
    componentDidMount(){
        $.ajax({
            url: '/api/resources',
            dataType: 'json',
            success: (res) => {
                let state=this.state;
                state.info=res;
                this.setState(state)
            },
            error: (err) => {
                console.log(err)
            },
        });
    }
}

export default CResources;