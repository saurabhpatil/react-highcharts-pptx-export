import React from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import Chart from "./components/Chart";
import * as options from './chartConfig';
import PptxGenJS from 'pptxgenjs';
import axios from 'axios';
import logo from './images/optum_logo.png';
import './index.css';
require("highcharts/modules/exporting")(Highcharts);


class App extends React.Component {
  convertToBase64 = (options) => axios.post('http://highcharts.dev.atlas.advisory.com', {'options': options, 'b64': 'true', 'type': 'png'})
  convertToURL = (options) => axios.post('http://highcharts.dev.atlas.advisory.com', {'options': options, 'async': 'true'})

  convertChartToImg = async() => {
    const res1 = await this.convertToBase64(options.chart1);
    let chart1 = res1.data;
    
    const res2 = await this.convertToBase64(options.chart2);
    let chart2 = res2.data;

    return {chart1, chart2}
  }

  generatePPT = async() => {
    let images = await this.convertChartToImg();

    let pptx = new PptxGenJS();
    pptx.setLayout('LAYOUT_WIDE');

    pptx.defineSlideMaster({
      title: 'MASTER_SLIDE',
      bkgd:  'FFFFFF',
      objects: [
        { 'rect':  { x: 0.0, y:6.5, w:'100%', h:0.75, fill:'F28638' } },
        { 'text':  { text:'Atlas Insights', options:{ x:11, y:6.55, w:5.5, h:0.6, color:'FFFFFF' } } },
        { 'image': { x:0.55, y:0.49, w:1.63, h:0.51, path:logo } }
      ],
      slideNumber: { x:0.3, y:'89%', color:'FFFFFF' }
    });

    let slide1 = pptx.addNewSlide('MASTER_SLIDE');
    slide1.addImage({ data:'image/png;base64,' + images.chart1, x:2.5, y:1, w:8, h:5 });
    
    let slide2 = pptx.addNewSlide('MASTER_SLIDE');
    slide2.addImage({ data:'image/png;base64,' + images.chart2, x:2.5, y:1, w:8, h:5 });
    
    pptx.save('Higcharts Export');
  }


  render() {
    return (
      <div>
          <Chart options={options.chart1} highcharts={Highcharts} ref={"chart"} />
          <Chart options={options.chart2} highcharts={Highcharts} ref={"chart"} />
          <button 
            style={{width: '100px', height: '40px'}}
            onClick={() => this.generatePPT()}>
            Export to PPT
          </button>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
