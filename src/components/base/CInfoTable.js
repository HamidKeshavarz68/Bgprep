import React from 'react';
import { Container} from 'react-bootstrap';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table'

import "./CInfoTable.css"
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import FlagIcon from '../FlagIcon'

class CInfoTable extends React.Component {
    state={}
    cntList=require('./code.json')
    //--------------------------------------------------------------------------------
    renderFlag(cell){
      return (<FlagIcon code={cell}/>)
    }
    //--------------------------------------------------------------------------------
    render(){
      let list=this.cntList.map((item)=>{
          return {flag:item.code.toLowerCase(),code:item.code,name:item.name}
        }
      )

      return(
          <div className="CInfoTable">
              <Container>
              <BootstrapTable data={ list }>
                <TableHeaderColumn dataField='flag' dataFormat={this.renderFlag}>#</TableHeaderColumn>
                <TableHeaderColumn dataField='name' isKey={true} dataSort={ true }>Name</TableHeaderColumn>
              </BootstrapTable>
              </Container>
          </div>
        )   
    }
}

export default CInfoTable