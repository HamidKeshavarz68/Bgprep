import React from 'react';
import {Menu,Grid} from 'semantic-ui-react'

import "./CVertScroll.css"
import 'semantic-ui-css/semantic.min.css';

//====================================================================================
class CVertScrollMenu  extends React.Component {
    render(){
        return(
        <Menu.Item
            icon="area graph"
            name={this.props.name}
            active={this.props.name==this.props.activeItem}
            onClick={this.props.onClick}
            />
        )
    }
}
//====================================================================================
class CVertScroll extends React.Component {
    state={activeItem:'Top Black List Hosts'}
    
    //--------------------------------------------------------------------------------
    handleItemClick = (e,c) =>{
        let t=this.state
        t.activeItem=c.name
        t.title=c.name
        this.setState(t)
    }
    //--------------------------------------------------------------------------------
    render(){
        const {activeItem} = this.state 
        return(
             <Grid className="CVertScroll">
                <Grid.Row columns={1}>
                    <Grid.Column width={16}>
                        <Menu pointing secondary vertical className="CVertScrollMenu">
                            <CVertScrollMenu name='Top Black List Hosts' activeItem={activeItem} onClick={this.handleItemClick}/>
                            <CVertScrollMenu name='Top Spammers Hosts' activeItem={activeItem} onClick={this.handleItemClick}/>
                            <CVertScrollMenu name='Top Gray List Hosts' activeItem={activeItem} onClick={this.handleItemClick}/>
                            <CVertScrollMenu name='Top Tor Hosts' activeItem={activeItem} onClick={this.handleItemClick}/>
                            <CVertScrollMenu name='Top Open Proxies Hosts' activeItem={activeItem} onClick={this.handleItemClick}/>
                            <CVertScrollMenu name='Top AD Servers Hosts' activeItem={activeItem} onClick={this.handleItemClick}/>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>

             </Grid>
         )   
    }
}

export default CVertScroll