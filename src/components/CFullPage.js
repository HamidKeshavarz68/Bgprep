import React from 'react';
import {Navbar,Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CFullPage.css"
//-------------------------------------------------------------------------------------
class CFulPageSlide extends React.Component {
    state={}
    touchStartPos=0
    //--------------------------------------------------------------------------------
    render(){
        return(
            <div className="CFullPageSlide" id={this.props.idName}>
                {this.props.children}
            </div>
        )
    }
}

//-------------------------------------------------------------------------------------
class CFullPage extends React.Component {
    state={
        activeChild:0
    }
    //--------------------------------------------------------------------------------
    constructor(prop){
        super(prop);
        
        //check for active url
        let url=window.location.pathname.replace("/","");
        for (let i in this.props.children){
            let l=this.props.children[i].props.label.toLowerCase();
            if (l===url){
                this.state.activeChild=i;
                break;
            }
        }
    }
    //--------------------------------------------------------------------------------
    onMenuClick(e){
        let index=e.target.attributes.data.value;
        let state =this.state;
        state.activeChild=Number(index);
        e.preventDefault();
        e.stopPropagation();
        this.setState(state);
    }
    //--------------------------------------------------------------------------------
    changePage(add){
        
        let childCnt=this.props.children.length;
        let state =this.state;


        //in non slider mode do nothing
        if(this.props.slider!==true){
            return(null)
        }
    
        if (add===false) {
            state.activeChild--;
            if(state.activeChild < 0) state.activeChild=0;
        } else{
            state.activeChild++;    
            if(state.activeChild >= childCnt) state.activeChild=(childCnt-1);
        }
        this.setState(state);
    }
    //--------------------------------------------------------------------------------
    onScroll(e){
        this.changePage(e.deltaY > 0);
    }
    //--------------------------------------------------------------------------------
    renderIndicator(){
        //check for simulating normal pages
        if(this.props.slider!==false){
            return(null)
        }

        let indicator=this.props.children.map((c,i)=>{
            let className=(this.state.activeChild===i) ? "CFullPageSlideBulletSelected":"CFullPageSlideBullet";
            return(
                <li key={i} className={className} data={i} onClick={(e)=>(this.onMenuClick(e))}><div></div></li>
            )
        })
        return (<ul className="CFullPageIndicator bg-dark">{indicator}</ul>)  
    }
    //--------------------------------------------------------------------------------
    renderNavBar(){
        let navBarMenus=this.props.children.map((c,i)=>{
            let label=(c.props.label!==undefined ? c.props.label:`Page ${i}`);
            let className=(this.state.activeChild===i) ? "active":"";
            return (<Nav.Link   className={className}
                                key={i} 
                                data={i} 
                                onClick={(e)=>(this.onMenuClick(e))}>
                        {label}
                    </Nav.Link>)
        })
        return(
            <div className="CFullPageNavbar bg-dark d-none d-sm-block">
                
                <Navbar bg="dark" variant="dark" sticky="top"> 
                <Navbar.Brand href="#home"><i className="flaticon-connection icon"></i>BGP Reputation</Navbar.Brand>
                    <Nav className="mr-auto">
                        {navBarMenus}
                    </Nav>
                </Navbar>
                
            </div>
        )
    }
    //--------------------------------------------------------------------------------
    onTouchStart(event){
        this.touchStartPos=event.touches[0].screenY;
    }
    //--------------------------------------------------------------------------------
    onTouchEnd(event){
        let diff=event.changedTouches[0].screenY-this.touchStartPos;
        this.changePage(diff>0)
    }
    //--------------------------------------------------------------------------------
    render(){
        
        //check empty child
        if (this.props.children.length===0){
            return (<div></div>)
        }
        
        //generate page indicator
        let indicator=this.renderIndicator();
        let navBar =this.renderNavBar();
        
        //return list
        return(
            <div className="CFullPage" 
                onWheel={(e) => this.onScroll(e)} 
                onTouchStart={(e) => this.onTouchStart(e)} 
                onTouchEnd={(e) => this.onTouchEnd(e)}>
                    {navBar}
                    {this.props.children[this.state.activeChild]}
                    {indicator}
            </div>
        )   
    }
    
}

export { CFullPage, CFulPageSlide}