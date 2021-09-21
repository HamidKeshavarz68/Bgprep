import './CReportPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../fonts/flaticon.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import React from 'react';
import {Table,Card,Row,Col,Container,Form} from 'react-bootstrap'
import FlagIcon from './base/FlagIcon'
import CMap from './base/CMap'
import Loader from 'react-loader-spinner'
import CUtils from './CUtils'
import $ from 'jquery'


class CReportASTopTable extends React.Component {
    state={info:null,abs:false}
    //--------------------------------------------------------------------------------
    fetchValue(abs){
        $.ajax({
            url: '/api/topas',
            dataType: 'json',
            data:{cat:this.props.cat,abs:abs},
            success: (res) => {
                let state=this.state;
                state.info=res;
                state.abs=abs;
                this.setState(state)
            },
            error: (err) => {
                console.log(err)
            },
        });
    }
    //--------------------------------------------------------------------------------
    changeSort(abs){
        this.fetchValue(abs)
    }
    //--------------------------------------------------------------------------------
    render(){

        //check for empty stat
        if (this.state.info===null){
            return(
                <Loader 
                className="CReportPageLoad"
                type="Oval"
                color="green"
                height={50}
                width={50}/>)
        }

        

        let body = this.state.info.map((object, index) => {
            let catObj=object.items.find((item)=>{
                if (item.category===this.props.cat){
                    return true;
                }   
                return false;
            })
            return (
                <tr key={index}>
                    <td key={1}>{object.as_number}</td>
                    <td key={2}>{CUtils.FormatLongString(object.isp,16)}</td>
                    <td key={3}><FlagIcon code={object.cnt.toLowerCase()}/>{" "+CUtils.GetCountryNameByID(object.cnt)}</td>
                    <td key={4}>{this.state.abs===false ? catObj.abs_rank : catObj.rank}</td>
                    <td key={5}>{catObj.report_count}</td>
                    <td key={6}>{catObj.uniq_address}</td>
                </tr>)
        })

        //
        return (
            <div className="CReportPageTopCountryChart">
                <Row>
                    <Col xs={8}><h5>{this.props.label}</h5></Col>
                    <Col>
                        <Form.Check type="checkbox" label="Absolute Rank" onClick={(e)=>{this.changeSort(e.target.checked)}}/>
                    </Col>
                </Row>
                
                <Table responsive size="sm">
                    <thead>
                        <tr>
                            <th>AS</th>
                            <th>ISP</th>
                            <th>Country</th>
                            <th>{this.state.abs===false? "ABS Rank":"REL Rank"}</th>
                            <th>Total IP</th>
                            <th>Uniq IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </Table>
            </div>
        )
    }
    //--------------------------------------------------------------------------------
    componentDidMount(){
        this.fetchValue(false);
    }
    //--------------------------------------------------------------------------------
    componentDidUpdate(){
        //this.fetchValue();
    }
}
//====================================================================================
class CReportCountryTopTable extends React.Component {
    state={info:null,
            abs:false}
    //--------------------------------------------------------------------------------
    fetchValue(abs){
        $.ajax({
            url: '/api/topcnt',
            dataType: 'json',
            data:{cat:this.props.cat,abs:abs},
            success: (res) => {
                let state=this.state;
                state.info=res;
                state.abs=abs;
                this.setState(state)
            },
            error: (err) => {
                console.log(err)
            },
        });
    }
    //--------------------------------------------------------------------------------
    changeSort(abs){
        this.fetchValue(abs)
    }
    //--------------------------------------------------------------------------------
    render(){

        //check for empty stat
        if (this.state.info===null){
            return(
                <Loader 
                className="CReportPageLoad"
                type="Oval"
                color="green"
                height={50}
                width={50}/>)
        }


        let body = this.state.info.map((object, index) => {
            let catObj=object.items.find((item)=>{
                if (item.category===this.props.cat){
                    return true;
                }   
                return false;
            })
            return (
                <tr key={index}>
                    <td key={1}>
                        <FlagIcon code={object.cnt_code.toLowerCase()}/> 
                        {" "+CUtils.GetCountryNameByID(object.cnt_code)} 
                    </td>
                    <td key={2}>{this.state.abs===false ? catObj.abs_rank : catObj.rank}</td>
                    <td key={3}>{catObj.report_count}</td>
                    <td key={4}>{catObj.uniq_address}</td>
                </tr>)
        })

        //
        return (
            <div className="CReportPageTopCountryChart">
                <Row>
                    <Col xs={8}><h5>{this.props.label}</h5></Col>
                    <Col>
                        <Form.Check type="checkbox" label="Absolute Rank" onClick={(e)=>{this.changeSort(e.target.checked)}}/>
                    </Col>
                </Row>
                
                <Table responsive size="sm">
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>{this.state.abs===false? "ABS Rank":"REL Rank"}</th>
                            <th>Total Address</th>
                            <th>Uniq Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </Table>
            </div>
        )

    }
    //--------------------------------------------------------------------------------
    componentDidMount(){
        this.fetchValue(false);
    }
    //--------------------------------------------------------------------------------
    componentDidUpdate(){
        //this.fetchValue();
    }
}
//====================================================================================
class CReportCountryMapTable extends React.Component {
    state = {
                cntStat:null,
                currentCnt:null,
                selected:null,
                cntCatData:null
            }
    //--------------------------------------------------------------------------------
    onSelectItem(e,data){
        //fetch data
        $.ajax({
            url: '/api/cntstat',
            dataType: 'json',
            data:{cat:data},
            success: (res) => {
                //update color
                let objList={}
                for(let obj of res) {
                    let val = obj.items.find((item)=>{
                        if(item.category===this.state.selected){
                            return true;
                        }
                        return false;
                    });
                    objList[obj.cnt_code.toLowerCase()]=val.safety_level;
                }
                this.props.onCatSelected(objList,state.selected)
            },
            error: (err) => {
                console.log(err)
            },
        });
        
        
        //update item
        let state=this.state;
        state.selected=data;
        this.setState(state);
    }
    //--------------------------------------------------------------------------------
    render(){
        
        //check for status
        if (this.state.cntStat===null){
            return(
                <Loader 
                className="CReportPageLoad"
                type="Oval"
                color="green"
                height={50}
                width={50}/>)
        }

        return (
            <div>
                <Table responsive size="sm">
                    <tbody>
                        <tr><th>{CUtils.GetCountryNameByID(this.props.cntCode)}</th><td><FlagIcon code={this.props.cntCode}/></td></tr>
                        <tr><th>est. DOS Firepower</th><td>{CUtils.FormatFPower(this.state.cntStat.f_power)}</td></tr>
                    </tbody>
                </Table>

                <Table responsive size="sm">
                    <tbody>
                        <tr><th>#</th><th>Rank</th><th>ABS Rank</th><th>Safety Score</th></tr>
                        {
                            this.state.cntStat.items.map((obj,index)=>{

                                let className="CReportMapItem";
                                if (this.state.selected===obj.category){
                                    className="CReportMapItemSelected"
                                }
                                
                                let color=CUtils.GetSafetyScoreColor(obj.safety_level)

                                return (<tr key={index} 
                                            className={className} 
                                            onClick={(e)=>{this.onSelectItem(e,obj.category)}}>
                                            <th key={1}>
                                                    {CUtils.FormatLongString(CUtils.GetCatLabel(obj.category),14)}
                                            </th>
                                            <td key={2}>{obj.rank}</td>
                                            <td key={3}>{obj.abs_rank}</td>
                                            <td key={4}>
                                                <div className="CReportPageSecScore">
                                                    <div style={{backgroundColor:color.backgroundColor,color:color.color}}>
                                                        {obj.safety_level}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )   
    }
    //--------------------------------------------------------------------------------
    updateCountryInfo(){
        if(this.state.currentCnt===this.props.cntCode){
            return
        }
        
        $.when(
            $.ajax({url: "/api/cntinfo",dataType: "json",data:{cnt:this.props.cntCode}}) //fetch cnt
        ).then(
            (cntInfo) => {
                this.setState({cntStat:cntInfo,currentCnt:this.props.cntCode})
                console.log(cntInfo)
            },
            () => {
                
            }
        )
    }
    //--------------------------------------------------------------------------------
    componentDidMount(){
        this.updateCountryInfo()
    }
    //--------------------------------------------------------------------------------
    componentDidUpdate(){
        this.updateCountryInfo()
    }
}

//====================================================================================
class CReportPage extends React.Component {
    state = {
        status : null,
        currentCnt: 'de',
        currentCntCat: null,
        currentCntCatData:null
    }
    //--------------------------------------------------------------------------------
    renderTopCntStatusObject(objects, label) {
        let body = objects.map((obj, index) => {
            let object = obj;
            return (
                <tr key={index}>
                    <td key={1}><FlagIcon code={object.cnt_code.toLowerCase()} />{object.cnt_code} </td>
                    <td key={2}>{object.abs_rank}</td>
                    <td key={3}>{object.total_ip}</td>
                    <td key={4}>{object.uniq_ip}</td>
                </tr>)
        })

        //<td>{object.reported}</td>
        //<td>{object.uniq}</td>

        return (
            <React.Fragment>
                <h3>{label}</h3>
                <Table responsive size="sm">
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Absolute Rank</th>
                            <th>Total Address</th>
                            <th>Uniq Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </Table>
            </React.Fragment>
        )

    }
    //--------------------------------------------------------------------------------
    renderCard(label,value,icon){
        return(
            <Card style={{marginBottom:"10px"}} className="CReportPageCard">
                <Card.Title className="CardTitle">
                    <i className={icon}></i>
                    {label}
                </Card.Title>
                <Card.Text className="CardBody">
                    {value}
                </Card.Text>
            </Card>
         )
    }
    //--------------------------------------------------------------------------------
    onMapClick(cntId){
       let state = this.state;
       state.currentCnt=cntId;
       this.setState(state);
    }
    //--------------------------------------------------------------------------------
    onCatSelected(mapData,cat){
        let state = this.state;
        state.currentCntCat=cat;
        state.currentCntCatData=mapData;
        this.setState(state);
    }   
    //--------------------------------------------------------------------------------
    renderMap(){
        return(<CMap 
                    onClick={(cntId)=>{this.onMapClick(cntId)}} 
                    mapData={this.state.currentCntCatData}
                    mapDataName={this.state.currentCntCat}/>
                )
    }
    //--------------------------------------------------------------------------------
    render() {
       

        //check for initial status
        if(this.state.status===null){
            return(
                    <Loader 
                    className="CReportPageLoad"
                    type="Bars"
                    color="green"
                    height={100}
                    width={100}/>)
        } 
        
        return (<div className="CReportPage">
            <Container>
                <Row>
                    <Col>
                        {this.renderCard("Total IP",this.state.status.total_ip,"flaticon-world-location")}
                    </Col>
                    <Col>
                        {this.renderCard("Uniq IP",this.state.status.uinq_ip,"flaticon-world-location")}
                    </Col>
                    <Col>
                        {this.renderCard("Resources",this.state.status.resource_count,"flaticon-information-button")}
                    </Col>
                    <Col>
                        {this.renderCard("IP Sets",this.state.status.set_count,"flaticon-valid-document")}
                    </Col>
                    <Col>
                        {this.renderCard("Last Update",this.state.status.last_update,"flaticon-updated")}
                    </Col>
                </Row>
                <Row>
                    <h4>Notes</h4>
                </Row>
                <Row>
                    <ul>
                        <li>
                            Countries report contains countries with more than 200000  IP address
                        </li>
                        <li>
                            DOS firepower calculated based on the average reported internet speed for each country. 
                        </li>
                        <li>
                            This report generated based on the relative rank of countries or BGP AS numbers.
                        </li>
                    </ul>
                </Row>
                <Row>
                    <Col xs={8}>
                        {this.renderMap()}
                    </Col>
                    <Col>
                        <CReportCountryMapTable cntCode={this.state.currentCnt} onCatSelected={
                                (data,cat)=>{this.onCatSelected(data,cat)}
                            }/>
                    </Col>
                </Row>
                <Row>
                        <h2>Top Countries</h2>
                </Row>
                <Row>
                    <Col><CReportCountryTopTable cat="black-list" label={CUtils.GetCatLabel("black-list")}/></Col>
                    <Col><CReportCountryTopTable cat="child_pornography_share" label={CUtils.GetCatLabel("child_pornography_share")}/></Col>
                </Row>
                <Row>
                    <Col><CReportCountryTopTable cat="ad-servers" label={CUtils.GetCatLabel("ad-servers")}/></Col>
                    <Col><CReportCountryTopTable cat="open-proxy" label={CUtils.GetCatLabel("open-proxy")}/></Col>
                </Row>
                <Row>
                    <Col><CReportCountryTopTable cat="open-access" label={CUtils.GetCatLabel("open-access")}/></Col>
                    <Col><CReportCountryTopTable cat="gray-list" label={CUtils.GetCatLabel("gray-list")}/></Col>
                </Row>
                <Row>
                    <Col><CReportCountryTopTable cat="tor" label={CUtils.GetCatLabel("tor")}/></Col>
                    <Col><CReportCountryTopTable cat="spammer" label={CUtils.GetCatLabel("spammer")}/></Col>
                </Row>
                <Row>
                    <Col><CReportCountryTopTable cat="harvesters" label={CUtils.GetCatLabel("harvesters")}/></Col>
                    <Col><CReportCountryTopTable cat="miner" label={CUtils.GetCatLabel("miner")}/></Col>
                </Row>
                <Row>
                        <h2>Top BGP AS Numbers</h2>
                </Row>
                <Row>
                    <Col><CReportASTopTable cat="black-list" label={CUtils.GetCatLabel("black-list")}/></Col>
                    <Col><CReportASTopTable cat="child_pornography_share" label={CUtils.GetCatLabel("child_pornography_share")}/></Col>
                </Row>
                <Row>
                    <Col><CReportASTopTable cat="ad-servers" label={CUtils.GetCatLabel("ad-servers")}/></Col>
                    <Col><CReportASTopTable cat="open-proxy" label={CUtils.GetCatLabel("open-proxy")}/></Col>
                </Row>
                <Row>
                    <Col><CReportASTopTable cat="open-access" label={CUtils.GetCatLabel("open-access")}/></Col>
                    <Col><CReportASTopTable cat="gray-list" label={CUtils.GetCatLabel("gray-list")}/></Col>
                </Row>
                <Row>
                    <Col><CReportASTopTable cat="tor" label={CUtils.GetCatLabel("tor")}/></Col>
                    <Col><CReportASTopTable cat="spammer" label={CUtils.GetCatLabel("spammer")}/></Col>
                </Row>
                <Row>
                    <Col><CReportASTopTable cat="harvesters" label={CUtils.GetCatLabel("harvesters")}/></Col>
                    <Col><CReportASTopTable cat="miner" label={CUtils.GetCatLabel("miner")}/></Col>
                </Row>
            </Container>
        </div>)
    }
    //--------------------------------------------------------------------------------
    componentDidMount(){
        $.when(
            $.ajax({url: "/api/stat",dataType: "json"}) //fetch stat
        ).then(
            (stat) => {
                console.log(stat)
                this.setState({
                                status:stat,
                                currentCnt:'de'
                            })
            },
            () => {
                alert("Error")
            }
        )
    }
}

export default CReportPage;

