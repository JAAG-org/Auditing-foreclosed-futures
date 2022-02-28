import React, { useState, useRef, useEffect } from 'react'
import Modal from 'react-modal'
import * as d3 from 'd3'
import './App.css'
import csvData from './data/th_us.csv'

const Chart = (props) => {
  const d3Container = useRef(null)

  useEffect(
    () => {
      const margin = { top: 10, right: 30, bottom: 30, left: 60 }
      const width = 400 - margin.left - margin.right
      const height = 200 - margin.top - margin.bottom

      if (props.data && d3Container.current) {
        const svg = d3.select(d3Container.current)
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        d3.csv(csvData, (d) => {
            const format = { date : d3.timeParse("%Y-%m")(d.date), value : parseFloat(d.value) }
            return format
        }).then(
          (data) => {
            const x = d3.scaleTime()
              .domain(d3.extent(data, (d) => {
                return d.date 
              }))
              .range([ 0, width ])
            svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x))

            const y = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return +d.value; })])
              .range([ height, 0 ])
            svg.append("g")
              .call(d3.axisLeft(y))

            svg.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "red")
              .attr("stroke-width", 1.5)
              .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })
              )
          }
        )
      }
    }, [props.data, d3Container.current]
  )

  return (
    <svg
      className="d3-component"
      width={400}
      height={200}
      ref={d3Container}
    />
  )
}

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="App">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="About"
        className="about-modal"
      >
        <h1> About </h1>
      </Modal>

      <div class="chart-container">
        <Chart data={[1, 2, 3]}/>
      </div>


      <h1 className="header"> Auditing foreclosed futures+ </h1>
      <h3 className="subheader"> Open Reception: 20 March 2022, 4PM++ </h3>

      <table className="table-files">
        <tr className="table-line">
          <th></th>
          <th className="table-header">Name</th>
          <th className="table-header">Last modified</th>
          <th className="table-header">Size</th>
          <th className="table-header">Description</th>
        </tr>
        <tr>
          <td>🆙</td>
          <td className="table-row-folder">Parent Directory</td>
          <td></td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>📈</td>
          <td className="table-row-folder">Collecting lost dreams as if it will never disappear (Giang)/</td>
          <td></td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>👀</td>
          <td className="table-row-folder">“Your Next Life in Thailand" (Nanut)/</td>
          <td></td>
          <td>-</td>
          <td></td>
        </tr>
        <tr className="table-line">
          <td>🌲</td>
          <td className="table-row-folder">Thailand lose dream (Tewprai)/</td>
          <td></td>
          <td>-</td>
          <td></td>
        </tr>
      </table>

      <p className="about" onClick={() => setModalOpen(true)}> About </p>
      <p className="artists"> Artists </p>
    </div>
  );
}

export default App;
