import React, { Component } from 'react';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class App extends Component {

  // 1. componentDidMount is used to create the chart.
  componentDidMount() {
    
    // Create chart
    var chart = am4core.create("chartdiv", am4charts.PieChart);

    // Enable RTL for the chart
    chart.rtl = true;

    // add legend in chart
    chart.legend = new am4charts.Legend();

    // Set legend itemContainers template to reverse the order of elements
     chart.legend.itemContainers.template.reverseChildren = true;

    // set legend property
    chart.legend.position = "left"

    // Set data
    chart.data = [{
      "فاكِهة ": "تفاحة",
      "كيلو": 501.9
    }, {
      "فاكِهة ": "رمان",
      "كيلو": 301.9
    }, {
      "فاكِهة ": "مانجو",
      "كيلو": 201.1
    }];
    
    // Create series
    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "كيلو";
    series.dataFields.category = "فاكِهة ";

    // Set colors for individual slices
    series.colors.list = [
      am4core.color("#00FFFF"), 
      am4core.color("#7393B3"), 
      am4core.color("#0000FF")  // Blue
    ];

    
    // Enable RTL for series labels using propertyFields
    series.labels.template.propertyFields.direction = "rtl";
    series.labels.template.propertyFields.text = "formattedText";

    // Format the text
    series.labels.template.adapter.add("formattedText", function (text, target) {
      return `"[bold]فاكهة[/]\n${target.dataItem.category}: ${target.dataItem.value.percent.formatNumber('#.#')}%"`;
    });

  }

  // 2. componentWillUnmount is used to cleanup the chart when it's done being used.
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  // 3. render is used to create the <div> which the chart will be displayed inside of.
  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "git" }}></div>
    );
  }
}

export default App;
