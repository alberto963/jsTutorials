
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
    
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' })
    
    const headers12 = [
        {name: 'sample_time', prompt: 'Sample Time', width: 70, },
        {name: 'bit_errors', prompt: 'Bit Errors', width: 60, },
        {name: 'bit_error_rate', prompt: 'Bit Error Rate', width: 70, },
        {name: 'total_test_time', prompt: 'Total Test Time', width: 70, },
        {name: 'result', prompt: 'Result', width: 60, }
      ]

    const headers3 = [
        {name: 'sample_time', prompt: 'Sample Time', width: 60, },
        {name: 'bit_errors', prompt: 'Value (microsecs))', width: 60, }
      ]

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
        console.log('event=', event)

        const generateData = amount => Array(amount).fill({
                // sample_time: new Date().toUTCString().trim(),
                sample_time: '10-10-1010',
                bit_errors: '3',
                bit_error_rate: '1x10-11',
                total_test_time: '120',
                result: 'Pass'
              })

        const doc = generateReport({
            testStatus: 'Success',
            failureReason: '-',
            data1: generateData(5),
            data2: generateData(5),
            data3: generateData(5)
        })
        doc.save('report.pdf')
    }

    return <button onClick={onChange}>Create sample PDF</button>
}

ReactDOM.render(<App />, document.querySelector('#root'))
    