import React, { useState, useRef, useEffect } from 'react'
import Modal from 'react-modal'
import * as d3 from 'd3'
import useMouse from '@react-hook/mouse-position'
import './App.css'
import './common.css'
import csvData from './data/th_us.csv'

const Chart = (props) => {
  const d3Container = useRef(null)
  const {
    mouseX,
    mouseY
  } = props
  const [increasing, setIncreasing] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    const increasingInterval = setInterval(() => {
      if (isRunning) {
        setIncreasing(value => value + 10)
      }
    }, 100)

    return () => {
      clearInterval(increasingInterval)
    }
  }, [isRunning])

  useEffect(() => {
    let interval
    if (!isRunning) {
      interval = setInterval(() => {
        setIsRunning(true)
        setIncreasing(0)
        d3.selectAll("svg > *").remove()
      }, 3000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isRunning, increasing])


  useEffect(
    () => {
      const margin = { top: 10, right: 30, bottom: 30, left: 60 }
      const width = 1000 - margin.left - margin.right
      const height = 400 - margin.top - margin.bottom

      console.log(increasing)

      if (increasing > 300) {
        setIsRunning(false)
      }

      if (d3Container.current) {
        const svg = d3.select(d3Container.current)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        d3.csv(csvData, (d) => {
          const format = { date: d3.timeParse("%Y-%m")(d.date), value: parseFloat(d.value) }
          return format
        }).then(
          (data) => {
            const x = d3.scaleTime()
              .domain(d3.extent(data, (d) => {
                return d.date
              }))
              .range([0, width])
            svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x))

            const y = d3.scaleLinear()
              .domain([0, d3.max(data, function (d) { return +d.value; })])
              .range([height, 0 + increasing])
            svg.append("g")
              .call(d3.axisLeft(y))

            svg.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "red")
              .attr("stroke-width", 1)
              .attr("d", d3.line()
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.value) })
              )
              .on("mouseover", function (mouseEvent) {
                d3
                  .select(this.parentNode)
                  .selectChild("path")
                  .style("stroke", "blue");
              })
          }
        )
      }
    }, [d3Container.current, increasing]
  )

  return (
    <svg
      className="d3-component"
      width={1000}
      height={400}
      ref={d3Container}
    />
  )
}

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const mouseRef = React.useRef(null)
  const mouse = useMouse(mouseRef, {
    enterDelay: 0,
    leaveDelay: 0,
  })

  return (
    <div className="mouse-overlay" ref={mouseRef}>
      <div style={{
        position: 'fixed',
        left: mouse.x,
        top: `calc(100% - ${mouse.y})`,
        height: '100%',
        borderLeft: '1px dashed white',
        zIndex: -1
      }}>
      </div>
      <div style={{
        position: 'fixed',
        left: `calc(100% - ${-mouse.x})`,
        top: mouse.y,
        width: '100%',
        borderTop: '1px dashed white',
        zIndex: -1
      }}>
      </div>

      <div className="app">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="About"
          className="about-modal"
        >
          <h1 className="modal-header"> About </h1>
        </Modal>

        <div className="chart-container">
          <Chart mouseX={mouse.x} mouseY={mouse.y} />
        </div>

        <header className="header">
          <h1 className="title text-shadow-white"> Auditing foreclosed futures* </h1>
          <h3 className="subtitle text-shadow-white"> Open Reception: 20 March 2022, 4PM++ </h3>
        </header>

        <div className='work-container'>

          <div className="work-card">
            <p className="work-card-title"> Thailand lost dream </p>
            <p className="work-card-artist"> Tewprai Bualoi </p>
          </div>

          <div className="work-card">
            <p className="work-card-title"> Collecting dreams as if it will never disappear </p>
            <p className="work-card-artist"> Wasawat Somno </p>
          </div>

          <div className="work-card">
            <p className="work-card-title"> Your next life in Thailand </p>
            <p className="work-card-artist"> Nanut Thanapornrapee </p>
          </div>

          <div className="work-card">
            <p className="work-card-title"> United </p>
            <p className="work-card-artist"> </p>
          </div>
        </div>

        <p className="about" onClick={() => setModalOpen(true)}> About </p>
        <p className="introduction"> Introductions </p>
      </div>
    </div>
  );
}

export default App;
