import React from "react";
import HighchartsReact from "highcharts-react-official";

class Chart extends React.Component {
  render() {
    return (
      <div className='div-chart'>
        <HighchartsReact
          highcharts={this.props.highcharts}
          constructorType={"chart"}
          options={this.props.options}
          ref={"wrappedChart"}
        />
      </div>
    );
  }
}

export default Chart;
