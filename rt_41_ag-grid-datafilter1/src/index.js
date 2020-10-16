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
        const debug = true
        const hardData = [
        {"athlete":"A1","age":1,"country":"X","year":2008,"date":"24/10/2020","sport":"S","gold":8,"silver":0,"bronze":0,"total":8},
        {"athlete":"A2","age":2,"country":"X","year":2004,"date":"29/10/2020","sport":"S","gold":6,"silver":0,"bronze":2,"total":8},
        {"athlete":"A2","age":3,"country":"X","year":2012,"date":"12/10/2020","sport":"S","gold":4,"silver":2,"bronze":0,"total":6},
        {"athlete":"A3","age":4,"country":"X","year":2008,"date":"24/10/2020","sport":"S","gold":1,"silver":2,"bronze":3,"total":6}
      ]
        const data = !debug ? JSON.parse(httpRequest.responseText) : hardData
        updateData(data)
      }
    }
  }

  const filterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      // For filter date (and time) please see: https://github.com/ag-grid/ag-grid/issues/2233
      // With 'latest' version (from 24 on) of community aggrid filterLocalDateAtMidnight provides also time
      // With previous version only date is provided - uncomment the following line to see what is provided

      // console.info('filterLocalDateAtMidnight=', filterLocalDateAtMidnight)
      // console.info('cellValue=', cellValue)
      
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