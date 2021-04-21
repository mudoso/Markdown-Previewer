import React from 'react'

const ListNumbered = ({ numListArrComplete }) => {

    return (
        <ol style={{ padding: null }}>
            {numListArrComplete.map((item, index) => <li key={'ol' + index}>{item}</li>)}
        </ol>
    )
}

export default ListNumbered
