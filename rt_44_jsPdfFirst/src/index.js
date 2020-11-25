
import React from 'react'
import ReactDOM from 'react-dom'
import { jsPDF } from 'jspdf'

const generateReport = ({
    testStatus = '', 
    failureReason = ' - ', 
    berMeasurementResult = '',
    prbsStartTimeAZ = '',
    prbsEndTimeAZ = '',
    prbsStartTimeZA = '',
    prbsEndTimeZA = '',
    data1, 
    data2, 
    latencyStartTime = '',
    latencyEndTime = '',
    averageLatency = '',
    minLatency = '',
    maxLatency = '',
    data3}) => {
    // Default export is a4 paper, portrait, using millimeters for units
    // const doc = new jsPDF()
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' })

    const createHeaders = (keys, prompts) => {
        var result = []
        for (var i = 0; i < keys.length; i += 1) {
          result.push({
            id: keys[i],
            name: keys[i],
            prompt: prompts[i],
            width: 60,
            align: 'center',
            padding: 0
          })
        }
        return result
    }
    
    const headers12 = createHeaders([
        'sample_time',
        'bit_errors',
        'bit_error_rate',
        'total_test_time',
        'result'
      ],[
        'Sample Time',
        'Bit Errors',
        'Bit Error Rate',
        'Total Test Time',
        'Result'
    ])

    const headers3 = createHeaders([
        'sample_time',
        'bit_errors'
      ],[
        'Sample Time',
        'Value in ms'
    ])

    doc.setFontSize(10)
    let ix = 15
    let iy = 15
    doc.text('Test Status:', ix, iy)
    doc.text(testStatus, ix + 60, iy)

    doc.text('Failure Reason:', ix, iy + 5)
    doc.text(failureReason, ix + 60, iy + 5)

    doc.text('BER Measurement Result:', ix, iy + 10)
    doc.text(berMeasurementResult, ix + 60, iy + 10)

    iy = 35
    doc.text('PRBS Start Time A-Z:', ix, iy)
    doc.text(prbsStartTimeAZ, ix + 60, iy)

    doc.text('PRBS End Time A-Z:', ix, iy + 5)
    doc.text(prbsEndTimeAZ, ix + 60, iy + 5)

    ix = 160
    doc.text('PRBS Start Time Z-A:', ix, iy)
    doc.text(prbsStartTimeZA, ix + 60, iy)

    doc.text('PRBS End Time Z-A:', ix, iy + 5)
    doc.text(prbsEndTimeZA, ix + 60, iy + 5)

    ix = 15
    iy = 50
    doc.table(ix, iy + 5, data1, headers12, { fontSize: 6, autoSize: true })
    doc.text('BER Measurements A-Z', ix, iy)
    doc.table(ix + 145, iy + 5, data2, headers12, { fontSize: 6, autoSize: true })
    doc.text('BER Measurements Z-A', ix + 145, iy)

    iy = 120
    doc.setFontSize(10)

    doc.text('Latency Start Time:', ix, iy)
    doc.text(latencyStartTime, ix + 60, iy)

    doc.text('Latency End Time:', ix, iy + 5)
    doc.text(latencyEndTime, ix + 60, iy + 5)

    doc.text('Average Latency:', ix, iy + 10)
    doc.text(averageLatency, ix + 60, iy + 10)

    doc.text('Min Latency:', ix, iy + 15)
    doc.text(minLatency, ix + 60, iy + 15)

    doc.text('Max Latency:', ix, iy + 20)
    doc.text(maxLatency, ix + 60, iy + 20)

    iy = 145
    doc.table(ix, iy + 10, data3, headers3, { fontSize: 6, autoSize: false })
    doc.text('Latency Measurements', ix, iy + 5)

    return doc
}

const App = () => {

    const onChange = event => {
        console.log('value=', event.target.value)

        var generateData = function(amount) {
            var result = []
            var data = {
                // sample_time: new Date().toString(),
              sample_time: '10-10-1010',
              bit_errors: '3',
              bit_error_rate: '1x10-11',
              total_test_time: '120',
              result: 'Pass'
            }
            for (var i = 0; i < amount; i += 1) {
              data.id = (i + 1).toString()
              result.push(Object.assign({}, data))
            }
            return result
          }

        const doc = generateReport({
            testStatus: 'Success',
            failureReason: '-',
            data1: generateData(5),
            data2: generateData(5),
            data3: generateData(5)
        })
        doc.save('a4.pdf')
    }

    return <button onClick={onChange}>Create sample PDF</button>
}

ReactDOM.render(<App />, document.querySelector('#root'))
    