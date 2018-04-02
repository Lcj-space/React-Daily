import * as React from "react"
import "./index.scss"

interface BrightRedProps {
    label: any
    value: any
}

/*
*
* label是需要进行高亮的文本内容，value是关键字
*
* */

const formatKeyword = ({ label, value }: BrightRedProps) => {
    if (value && value != "") {
        return (
            <span>
                {label
                    .split(value)
                    .reduce((prev: any, current: any, i: number) => {
                        if (!i) {
                            return [current]
                        }
                        return prev.concat(
                            <span
                                className="search-result-keyword"
                                key={value + current + i}>
                                {value}
                            </span>,
                            current
                        )
                    }, [])}
            </span>
        )
    } else {
        return label
    }
}
export default formatKeyword
