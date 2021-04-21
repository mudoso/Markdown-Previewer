import React from 'react'

const ListUnordered = ({ listArrComplete }) => {


    return (
        <ul style={{ padding: null }}>
            {listArrComplete.reduce((acc, item) =>
                <li>
                    {item}
                    <ul>{acc}</ul>
                </li>, '')}
        </ul>
    )
}

export default ListUnordered
