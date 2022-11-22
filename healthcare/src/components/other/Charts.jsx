import React from 'react'
import { Chart } from "react-google-charts";
import './chart.css'

export const data = [
  ["Task", "Disease count"],
  ["Fever", 20],
  ["Cold", 10],
  ["Diabetes", 7],
  ["Other", 6],
  ["Covid-19", 7],
];

export const options = {
  title: "Diseases Count",
};


export const Charts = (props ) => {
  return (
    <div className='chart'>
        <div>
        <Chart
      chartType={props.charttype}
      data={data}
      options={options}
      width={"100%"}
      height={"15rem"} 
      style={{fontSize:"1rem"}}
    />
        </div>
    </div>
 )
}
