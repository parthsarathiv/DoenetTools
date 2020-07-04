import React from 'react';
import useDoenetRender from './useDoenetRenderer';
import styled from 'styled-components'
import { useTable } from 'react-table';


const Styles = styled.div`
padding: 1rem;

table {
  border-spacing: 0;
  border: 1px solid black;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    font-weight: normal;
    text-align: left;
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
}
`;

export default function Table(props) {

    let [name, SVs, actions, children] = useDoenetRender(props);

    if (SVs.hide) {
        return null;
    }

    let columns = []
    let data = []

    let headerflag = true;
    for (let [rowNum, rowData] of SVs.renderedChildNumberByRowCol.entries()) {
      if(headerflag){
        for(let childInd of rowData){
          if(childInd != null){
            columns.push({
              Header: children[childInd],
              accessor: `col${childInd}`,
            });
          }
        }
        headerflag = false;
      }else{
        let row = {}
        for(let ind in rowData){
          let childInd = rowData[ind];
          if(childInd != null){
            row[`col${ind}`] = children[childInd]
          }
        }
        if(Object.keys(row).length !== 0){
          console.log("row", row.length);
          
          data.push(row);
        }
      }

    }

    console.log(columns);
    

    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    } = useTable({
    columns,
    data,
    })

    //Render the UI for your table
    return (
    <Styles>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
    </Styles>
      )
    // let table = [];

    // for (let [rowNum, rowData] of SVs.renderedChildNumberByRowCol.entries()) {
    //   console.log([rowNum, rowData]);
      
    //   let row = rowData.map((childInd, colInd) => <td key={"col" + colInd}>{children[childInd]}</td>);
    //   table.push(<tr key={"row" + rowNum}>{row}</tr>)
    // }

    // return(
    //     <><a name={name} /><table id={name}>
    //     <tbody>
    //         {table}
    //     </tbody>
    //     </table></>
    // );
  
  }
