import React from 'react';
import "./CMap.css"

import { VectorMap} from '@south-paw/react-vector-maps'; //https://react-vector-maps.netlify.com/examples
import { Container } from 'react-bootstrap';
import $ from 'jquery'

class CMap extends React.Component {
    state={select:'de'}
    colors=["#1a0000","#660000","#8b0000","#cc0000","#ff0000","#ff3333","#ff6666","#ff8080","#ffb3b3","#ffe6e6","#eee"]
    //--------------------------------------------------------------------------------
    onClick = ({ target }) => {
      
      if(target.attributes.id===undefined){
        return;
      }


      const id = target.attributes.id.value;
      let state=this.state;
      state.select=id
      this.setState(state)
      this.setColors()

      //check for callback
      if (this.props.onClick!==undefined){
        this.props.onClick(id)
      }


    }
    //--------------------------------------------------------------------------------
    setColors(){
      const WordData = require('./data/world-low-res.json');
      //WordData.layers.length
      for(let l of WordData.layers ){
        let selector=`.CMapContainer #${l.id}`
        if (l.id===this.state.select){
          $(selector).css('fill', 'green');
        } else {
          if(this.props.mapData!=null){
            let color=this.colors[this.props.mapData[l.id]]
            $(selector).css('fill', color);
            //$(selector).css('fill', '#111');
          }else {
            $(selector).css('fill', '#eee');
          }
        }
        //let index = Math.ceil((Math.random()*100))%5
        //$(selector).css('fill', this.colors[index]);
        
      }
    }
    //--------------------------------------------------------------------------------
    render(){
      const WordData = require('./data/world-low-res.json');
      return(
          <div className="CMap">
              <Container>
                <div className="CMapContainer">
                    <VectorMap {...WordData} onClick={this.onClick}/>;
                </div>
              </Container>
          </div>
        )   
    }
    //--------------------------------------------------------------------------------
    componentDidMount(){
      this.setColors()
    }
    //--------------------------------------------------------------------------------
    componentDidUpdate(prevProps){
      console.log(prevProps.mapData)
      if(prevProps.mapDataName===this.props.mapDataName){
        return
      }

      

      this.setColors();
    }
}

export default CMap