# React PPT Export

This app demonstrates how to generate PPT from ReactJS by converting Highcharts graphs into PNG images using a highcharts export server.

## Installation
#### Setup Highcharts Export Server
> Note: This method should only be used if you have security restrictions regarding your data going to external servers. 
>
>Highcharts React provides a handy export method `chart.ExportChart()` to convert charts to images. This, however, send the chart data to 'export.highcharts.com' to generate the image.


- Install highcharts node export server following the official highcharts instructions found [here](https://github.com/highcharts/node-export-server).
- In my case, I created an AWS EC2 instance and had the highcharts export server running there. This helps me repurpose the server across all my applications. 
- You can use Nginx or Apache HTTP server to redirect http(port 80) and https(port 443) requests to the highcharts server as well.

#### Setup Repository
- Clone the repo and install the npm dependencies using  
  `$ npm install` or `$ yarn install`

- Run the application  
  `$ npm start`