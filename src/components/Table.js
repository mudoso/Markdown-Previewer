import React from 'react'

const Table = ({ tableArrComplete }) => {
    const [tableHead, ...tableBody] = tableArrComplete

    return <table className=''>
        <thead>
            <tr>
                {tableHead.split('|')
                    .map((item, hIndex) =>
                        <th key={'th' + hIndex}>
                            {item}
                        </th>
                    )}
            </tr>
        </thead>
        <tbody>
            {tableBody.map((tRow, tIndex) =>
                <tr key={'td' + tIndex}>
                    {tRow.split('|').map((tData, dIndex) =>
                        <td key={'td' + dIndex}>{tData}</td>)}
                </tr>)}
        </tbody>
    </table>
}

export default Table
