import React, {  useCallback, useRef } from 'react'
import './App.css';
import { toPng } from 'html-to-image'
import {useDownloadExcel} from 'react-export-table-to-excel'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import { useDownloadExcel } from 'react-export-table-to-excel';
function App() {
  let imageRef = useRef()


  const onButtonClick = useCallback(() => {
    if (imageRef.current === null) {
      return
    }

    toPng(imageRef.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [imageRef])

  
  let tableData = [
    { id: '1', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '2', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '3', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '4', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '5', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '6', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '7', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '8', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '9', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '10', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '11', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '12', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '13', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '14', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '15', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' },
    { id: '16', firstName: 'Lalita', middleName: "Vyankat", lastName: 'Savale', ClassName: '3rd', Subject: 'Hindi' }
  ];

  const tableRef = useRef(null);

  const downloadExcel = () => {
    const table = tableRef.current;
    const workbook = XLSX.utils.table_to_book(table, { sheet: 'leavesInfo' });
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Employee_Leave_Data.xlsx');
  };
  return (
    <div className='AppMainCont' >
      <div className="App" ref={imageRef}>
        <h1>HTml to Image container</h1>
      </div>
      <div className='downloadBtn' onClick={onButtonClick}> download Image</div>
      <div className='AppMainCont'>
      <table border={1} ref={tableRef}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Class</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.firstName}</td>
              <td>{i.middleName}</td>
              <td>{i.lastName}</td>
              <td>{i.ClassName}</td>
              <td>{i.Subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='downloadBtn' onClick={downloadExcel}>Download Excel</div>
    </div>
    </div>
  );
}

export default App;
