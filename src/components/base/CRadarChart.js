import React from "react"
import shortid from "shortid";
import Chart from "chart.js"
import $ from "jquery"


import "./CRadarChart.css"

class CRadarChart extends React.Component {
    state={id:shortid.generate()}
    //--------------------------------------------------------------------------------------------------------  
    render() {
        return(
            <div className="CRadarChart">
                <canvas id={this.state.id}>
                </canvas>
            </div>
        )
    }
    //--------------------------------------------------------------------------------------------------------
    componentDidMount(){
        let ctx=$("#"+this.state.id)
        let options = {
            scale: {
                angleLines: {
                    display: true
                },
                ticks: {
                    suggestedMin: this.props.min,
                    suggestedMax: this.props.max
                }
            },
        };


        new Chart(ctx, {
            type: 'radar',
            data:this.props.chartData,
            options: options,
        });
    }
}

export default CRadarChart