import React from "react"
import shortid from "shortid";
import Chart from "chart.js"
import $ from "jquery"


import "./CLineChart.css"

class CLineChart extends React.Component {
    state={id:shortid.generate()}
    //--------------------------------------------------------------------------------------------------------  
    render() {
        return(
            <div className="CLineChart">
                <canvas id={this.state.id}>
                </canvas>
            </div>
        )
    }
    //--------------------------------------------------------------------------------------------------------
    componentDidMount(){
        let ctx=$("#"+this.state.id)
        let options = 
        {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: this.props.label
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
            }
        };


        new Chart(ctx, {
            type: 'line',
            data:this.props.chartData,
            options: options,
        });
    }
}

export default CLineChart