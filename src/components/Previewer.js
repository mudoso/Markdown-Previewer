import React, { useState } from 'react'
import ListNumbered from './ListNumbered'
import ListUnordered from './ListUnordered'
import Table from './Table'


const Previewer = ({ previewerText }) => {
    let [codeArr] = useState([])
    let [isMLineCode] = useState(false)
    let [tableArr] = useState([])
    let [isTable] = useState(false)
    let [listArr] = useState([])
    let [isList] = useState(false)
    let [numListArr] = useState([])
    let [isNumList] = useState(false)

    const lineDivider = string => string.split("\n")

    const markTag = (str, index) => {
        const isString = (typeof str === 'string')
        const hasLink = str.includes('http')
        if (!isString) return str

        switch (true) {
            case str.startsWith('### '):
                return <h3 key={index}>{str.replace('### ', '')}</h3>
            case str.startsWith('## '):
                return <h2 key={index}>{str.replace('## ', '')}</h2>
            case (str.startsWith('# ')):
                return <h1 key={index}>{str.replace('# ', '')}</h1>
            case (str.includes('`<')): {
                let [startStr, remainingStr] = str.split('`<')
                let [codeText, endStr] = remainingStr.split('>`')
                return <p key={index}>
                    {startStr}<code>{`<${codeText}>`}</code>{endStr}
                </p>
            }
            case (str.includes('**_')): {
                let [startStr, remainingStr] = str.split('**_')
                let [boldItalicText, endStr] = remainingStr.split('_**')
                return <p key={index}>{startStr}
                    <em><b>{boldItalicText}</b></em>{endStr}
                </p>
            }
            case (str.includes('**')): {
                let [startStr, boldText, endStr] = str.split('**')
                return <p key={index}>{startStr}<b>{boldText}</b>{endStr}</p>
            }
            case (str.includes('_') && !hasLink): {
                let [startStr, italicText, endStr] = str.split('_')
                return <p key={index}>{startStr}<em>{italicText}</em>{endStr}</p>
            }
            case (str.startsWith('> ')): {
                return <blockquote key={index}>
                    <i className="fas fa-quote-left"></i>
                    {` ${str.replace('> ', '')} `}
                    <i className="fas fa-quote-right"></i>
                </blockquote>
            }
            case (str.includes('~~')): {
                let [startStr, strikeText, endStr] = str.split('~~')
                return <p key={index}>{startStr}
                    <s style={{ textDecoration: 'line-through' }}>
                        {strikeText}
                    </s>{endStr}</p>
            }
            case (str.includes('![')): {
                console.log(str);
                let [startStr, remainingStr] = str.split('![')
                let [alt, remainingStr2] = remainingStr.split('](')
                let [src, endStr] = remainingStr2.split(')')
                return <p key={index}>
                    {startStr}
                    <img src={src} alt={alt} />
                    {endStr}
                </p>
            }
            case (str.includes(' [')): {
                let [startStr, remainingStr] = str.split(' [')
                let [linkText, remainingStr2] = remainingStr.split('](')
                let [href, endStr] = remainingStr2.split(')')
                return <p key={index}>
                    {startStr}
                    <a href={href}>{`<${linkText}>`}</a>
                    {endStr}
                </p>
            }
            default:
                return str
        }
    }
    const markMLineCode = (str, index, maxEditor) => {
        const isString = (typeof str === 'string')
        if (!isString) return str

        const isTripleBacktick = (str === '```')
        const isMLineActive = (isTripleBacktick || isMLineCode)
        const isEndOfEditor = (index === maxEditor - 1)
        const isMLineFinished = ((isTripleBacktick || isEndOfEditor) && isMLineCode)

        if (isMLineActive) {
            if (isMLineFinished) {
                isMLineCode = !isMLineCode
                let codeArrComplete = codeArr
                codeArr = []
                return <div key={index} className='code'>
                    {codeArrComplete.reduce((acc, item) => acc + item + '\n', '')}
                </div>
            }
            if (isMLineCode) {
                codeArr = [...codeArr, str]
                return null
            }
            if (isTripleBacktick) {
                isMLineCode = !isMLineCode
                return null
            }
        }
        return str
    }
    const markTable = (str, index, maxEditor) => {
        const isString = (typeof str === 'string')
        if (!isString) return str

        const isPipe = (str.includes('|'))
        const isTripleLine = (str.includes('---'))
        const isEndOfEditor = (index === maxEditor - 1)
        const isTableFinished = ((!isPipe || isEndOfEditor) && isTable === true)

        if (isTripleLine) return null

        if (isPipe && isTable === false) {
            isTable = !isTable
        }
        if (isPipe) {
            tableArr = [...tableArr, str]
            return null
        }
        if (isTableFinished) {
            isTable = !isTable
            const tableArrComplete = tableArr
            tableArr = []
            return <Table key={index} tableArrComplete={tableArrComplete} />
        }
        return str
    }
    const markUnorderedList = (str, index, maxEditor) => {
        const isString = (typeof str === 'string')
        if (!isString) return str

        const isMark = (str.includes('- '))
        const isEndOfEditor = (index === maxEditor - 1)
        const isListFinished = ((!isMark || isEndOfEditor) && isList === true)

        if (isMark && isList === false) {
            isList = !isList
        }
        if (isMark) {
            let string = str.split('- ')

            listArr = [string[1], ...listArr]
            return null
        }
        if (isListFinished) {
            isList = !isList
            const listArrComplete = listArr
            listArr = []
            return <ListUnordered key={index} listArrComplete={listArrComplete} />
        }
        return str
    }
    const markNumberedList = (str, index, maxEditor) => {
        const isString = (typeof str === 'string')
        if (!isString) return str

        const isNumbered = (str.startsWith('1. '))
        const isEndOfEditor = (index === maxEditor - 1)
        const isNumListFinished = ((!isNumbered || isEndOfEditor) && isNumList === true)

        if (isNumbered && isNumList === false) {
            isNumList = !isNumList
        }
        if (isNumbered) {
            let string = str.split('1. ')

            numListArr = [...numListArr, string[1]]
            return null
        }
        if (isNumListFinished) {
            isNumList = !isNumList
            const numListArrComplete = numListArr
            numListArr = []
            return <ListNumbered key={index} numListArrComplete={numListArrComplete} />
        }
        return str
    }

    const markdownFormatter = (str, index, arr) => {
        str = markTag(str, index)
        str = markMLineCode(str, index, arr.length)
        str = markTable(str, index, arr.length)
        str = markUnorderedList(str, index, arr.length)
        str = markNumberedList(str, index, arr.length)

        return typeof str !== 'string'
            ? str
            : (str === '')
                ? <br key={index} />
                : <p key={index}>{str}</p>
    }

    return (
        <>
            <section id="preview" className="box previewer">
                {lineDivider(previewerText).map((str, index, arr) =>
                    markdownFormatter(str, index, arr)
                )}
            </section>
        </>
    )
}
export default Previewer
