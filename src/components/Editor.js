import React from 'react'

const Editor = ({ textEdit, onChange }) => {
    return (
        <>
            <textarea
                id="editor"
                className="box"
                onChange={onChange}
                defaultValue={textEdit}
            />
        </>
    )
}
export default Editor