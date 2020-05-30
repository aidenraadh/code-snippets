import React from 'react';

/*
|--------------------------------------------------------------------------
| Table
|--------------------------------------------------------------------------
|
| Must declared properties:
|
| #1 headData
| Represents the columns in the table heading
|
| headData structure:
|
| headData = [(str)heading_1, (str)heading_2, ...]
|
| #2 bodyData
| Represents the rows and columns in the table body
|
| bodyData structure:
|
| bodyData = [
|    [(str)col_1, (str)col_2, ...], - #1 row
|    [(str)col_1, (str)col_2, ...], - #2 row
|    ...    
| ]
*/

function Table(props){
  return (
    <>
    <table>
      <thead>
        <tr>
        {props.headData.map((data, idx) => (
          <th key={idx}>{data}</th>
        ))}
        </tr>
      </thead>
      <tbody>
        {props.bodyData.map((row, rowidx) => (
        <tr key={rowidx}>
          {row.map((col, colidx) => (
          <td key={colidx}>{col}</td>
          ))}
        </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default Table;

