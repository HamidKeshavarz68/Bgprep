import './CSearchPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../fonts/flaticon.css'

import React from 'react';
import {Button, Container, Form, FormControl, Row, Table,Col} from 'react-bootstrap'
import FlagIcon from './base/FlagIcon'
import CRadarChart from './base/CRadarChart'
import CLineChart from './base/CLineChart'
import $ from "jquery"
import CUtils from './CUtils'

class CSearchPage extends React.Component {
    state = {error:false,info:null}
    //--------------------------------------------------------------------------------
    getSafetyLevelVal(value){
        let vn=Number(value);
        let colorVal=CUtils.GetSafetyScoreColor(vn)
        let color=colorVal.color
        let backgroundColor=colorVal.backgroundColor;

        return (<div className="CSearchReportValue">
                    <div style={{backgroundColor:backgroundColor,color:color}}>
                        {value}
                    </div>
                </div>)    
    }
    //--------------------------------------------------------------------------------
    renderResultBody(items){
        let body = items.map((c,i)=>{
            return (
            <tr key={i}>
                <td key={1}>{CUtils.GetCatLabel(c.category)}</td>
                <td key={2}>{c.report_count}</td>
                <td key={3}>{c.uniq_address}</td>
                <td key={4}>{c.abs_rank}</td>
                <td key={5}>{c.rank}</td>
                <td key={6}>{this.getSafetyLevelVal(c.safety_level)}</td>
            </tr>
            )
        });
        
        return(
        <Table responsive>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Reported IP</th>
                    <th>Unique IP</th>
                    <th>ABS Rank</th>
                    <th>Relative Rank</th>
                    <th>Safety Score</th>
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </Table>)
    }
    //--------------------------------------------------------------------------------
    renderLocationResult(object) {
        
        let body=this.renderResultBody(object.items);
        
        let uniqIp=object.items.reduce((a,b)=>{
            return a+Number(b.uniq_address);
        },0);
        
        let rIp=object.items.reduce((a,b)=>{
            return a+Number(b.report_count);
        },0);


        return(
            <div className="CSearchReportHeader">
                <h3><i className="flaticon-geolocalization icon"></i>Location Information</h3>
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Total IP</th>
                                <th>Reported IP</th>
                                <th>Unique IP</th>
                                <th>est. DOS Fire Power</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><FlagIcon code={object.cnt_code.toLowerCase()}/> {object.cnt_code} </td>
                                <td>{object.total_ip}</td>
                                <td>{rIp}</td>
                                <td>{uniqIp}</td>
                                <td>{CUtils.FormatFPower(object.f_power)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                {body}
            </div>
        )            
    }
    //--------------------------------------------------------------------------------
    renderInformation(){
        return(
            <div>
                <p>
                </p>
            </div>
        )
    }
    //--------------------------------------------------------------------------------
    renderASResult(object) {
        let body=this.renderResultBody(object.items);
        
        let uniqIp=object.items.reduce((a,b)=>{
            return a+Number(b.uniq_address);
        },0);
        
        let rIp=object.items.reduce((a,b)=>{
            return a+Number(b.report_count);
        },0);


        return(
            <div className="CSearchReportHeader">
                <h3><i className="flaticon-connection icon"></i>BGP AS Information</h3>
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>AS</th>
                                <th>Provider</th>
                                <th>Total IP</th>
                                <th>Reported IP</th>
                                <th>Unique IP</th>
                                <th>est. DOS Fire Power</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{object.as_number} </td>
                                <td>{object.isp} </td>
                                <td>{object.total_ip}</td>
                                <td>{rIp}</td>
                                <td>{uniqIp}</td>
                                <td>{CUtils.FormatFPower(object.f_power)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                {body}
            </div>
        )            
    }
    //--------------------------------------------------------------------------------
    renderRadarChart(cntInfo,bgpInfo){
        
        let labels=[]
        let valuesCnt=[]
        let valuesAS=[]

        for(let item of cntInfo.items){
            labels.push(CUtils.GetCatLabel(item.category))
            valuesCnt.push(item.safety_level)
            
            let bgpItem=bgpInfo.items.filter((val)=>{
               if (val.category===item.category) {
                   return true;
               }
               return false;
            })
            valuesAS.push(bgpItem[0].safety_level)
        }

        let data= {
                        labels: labels,
                        datasets: [
                            {    
                                label:"Country",
                                backgroundColor: "rgba(0,255,0,0.3)",
                                data: valuesCnt
                            },
                            {    
                                label:"BGP AS",
                                backgroundColor: "rgba(0,0,255,0.3)",
                                data: valuesAS
                            },
                    ]
        }

        return (
            <div style={{marginTop:"4%"}}>
                <p>
                </p>
                <CRadarChart min={0} max={10} chartData={data}/>
            </div>
            
        )
    }
    //--------------------------------------------------------------------------------
    renderHistory(){
        let colors=["green","blue"];

        

        let generateRandom=()=>{
            let result=[];
            for (let i=0;i<30;i++){
                result.push(Math.floor((Math.random()*100000)));
            }
            return result;
        }

        let generateDates=()=>{
            let result=[];
            let start= new Date().getTime();
            for (let i=0;i<30;i++){
                let d= new Date(start);
                let strD=""
                strD = d.getMonth()+1;
                strD += "/"+d.getDate();

                result.push(strD);


                start -= (3600*24*1000);
            }
            return result;
        }
        
        let labels = ["Reported","Uniq"]
        let dataSet=labels.map((c,i)=>{
            let obj={
                label:c,
                fill:false,
                data:generateRandom(),
                borderColor: colors[i],
				backgroundColor: colors[i],
            };
            return obj;
        });

        let data={
            labels: generateDates(),
            datasets:dataSet
        }

        return (
            <div style={{marginTop:"4%"}}>
                <CLineChart chartData={data} label="One month history"/>
            </div>
        )
    }
    //--------------------------------------------------------------------------------
    renderInResultSearch(){
        return(
        <div className="CSearchPageResultSearch">
            <Container>
                <Form inline>
                    <FormControl type="text" placeholder="IP or AS Number" style={{minWidth:"300px"}} ref="address" />
                    <Button variant='outline-success' onClick={(e)=>{this.onSearchClick()}}>Search</Button>
                </Form>
            </Container>
        </div>)
    }
    //--------------------------------------------------------------------------------
    renderResult(info){

        let cntSecData=info.cnt
        let asSecData=info.as


        let help=this.renderInformation();
        let cntInfo=this.renderLocationResult(cntSecData);
        let asInfo=this.renderASResult(asSecData);
        let radarChart=this.renderRadarChart(cntSecData,asSecData);
        let inSearchResult=this.renderInResultSearch();
        return(
            <div className='CSearchPage'>
                    <Container>
                        <Row>
                            <Col>
                                {inSearchResult}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {help}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {cntInfo}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {asInfo}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {radarChart}
                            </Col>
                        </Row>
                    </Container>
            </div>
        )
    }
    //--------------------------------------------------------------------------------
    onSearchClick(){
        let ipMatch=/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
        let asMatch=/^as\d{1,9}$/
        let val=this.refs.address.value

        if(val.match(ipMatch)==null && val.match(asMatch)==null){
            this.setState({error:true})
        } else {
            $.ajax({
                url: '/api/search',
                dataType: 'json',
                data:{value:val},
                success: (res) => {
                    let state=this.state;
                    state.info=res;
                    this.setState(state)
                },
                error: (err) => {
                    alert(`Can not find any information for ${val}`)
                },
            });
        }
    }
    //--------------------------------------------------------------------------------
    renderSearchStart(){

        let infoClass="CSearchPageInfo small"
        if (this.state.error===true){
            infoClass +=" CSearchError"
        }


        return( 
            <div className='CSearchPage'>
                <Container className='CSearchPageCenter'>
                    <Row>
                        <Col>
                            <div className='CSearchPageLogo'>
                                <h1><i className='flaticon-world-location'></i> BGP <span className="small">Reputation</span></h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form inline>
                                <FormControl type="text" placeholder="IP or AS Number" style={{minWidth:"300px"}} ref="address" />
                                <Button variant='outline-success' onClick={(e)=>{this.onSearchClick()}}>Search</Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row >
                        <span className={infoClass}>For example : 8.8.8.8 or as1234</span>
                    </Row>
                    <Row >
                        <span className="CSearchPageInfo small"></span>
                    </Row>
                </Container>
            </div>
        )
    }
    //--------------------------------------------------------------------------------
    render(){
        let result=null;
        
        if(this.state.info===null){
            result=this.renderSearchStart();
        } else {
            result=this.renderResult(this.state.info);
        }
        return (result);
    }
}
export default CSearchPage;