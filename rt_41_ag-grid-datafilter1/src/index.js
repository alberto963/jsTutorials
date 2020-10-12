import './index.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import CustomDateComponent from './customDateComponent.jsx'

const GridExample = () => {
  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)

  const [rowData, setRowData] = useState([])

  const onGridReady = params => {
    setGridApi(params.api)
    setGridColumnApi(params.columnApi)

    const httpRequest = new XMLHttpRequest()
    const updateData = data => setRowData(data)
    const dataUrl = 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
    httpRequest.open('GET', dataUrl)
    httpRequest.send()

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText))
      }
    }
  }

  const filterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      var dateAsString = cellValue
      var dateParts = dateAsString.split('/')
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      )
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1
      }
    },
  }

  const defaultColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
    resizable: true,
  }

  return (
    <div style={{width: '100%', height: '100%'}}>
      <div id='myGrid' style={{height: '100%', width: '100%',}} className='ag-theme-alpine'>
        <AgGridReact defaultColDef={defaultColDef} rowData={rowData}
          frameworkComponents={{agDateInput: CustomDateComponent}} onGridReady={onGridReady}>
          <AgGridColumn field='athlete'></AgGridColumn>
          <AgGridColumn field='age' filter='agNumberColumnFilter'></AgGridColumn>
          <AgGridColumn field='country'></AgGridColumn>
          <AgGridColumn field='year'></AgGridColumn>
          <AgGridColumn field='date' minWidth={190} filter='agDateColumnFilter' filterParams={filterParams}></AgGridColumn>
          <AgGridColumn field='sport'></AgGridColumn>
          <AgGridColumn field='gold' filter='agNumberColumnFilter'></AgGridColumn>
          <AgGridColumn field='silver' filter='agNumberColumnFilter'></AgGridColumn>
          <AgGridColumn field='bronze' filter='agNumberColumnFilter'></AgGridColumn>
          <AgGridColumn field='total' filter={false}></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  )
}

ReactDOM.render(<GridExample />, document.getElementById('root'))