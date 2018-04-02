import * as React from "react"
import "./index.scss"

interface item {
    FileName: string
    Id: number
    PId: number
}

interface BreadcrumbProps {
    Folders: Array<item>
    breadCrumbClick: (id: number) => (e: any) => void
}

const Breadcrumb = ({ Folders, breadCrumbClick }: BreadcrumbProps) => {
    const _Folders = [...Folders]
    const total = _Folders.length
    if (total > 5) {
        _Folders.splice(1, total - 5)
        _Folders.splice(1, 0, { FileName: "", Id: 0, PId: 0 })
    }
    return (
        <ul className="breadcrumbContainer  tu-clearfix ">
            {_Folders.map(
                (item: item, index: number) =>
                    item.FileName != "" ? (
                        <li
                            className="tu-fl tu-font-a2"
                            key={index}
                            onClick={breadCrumbClick(item.Id)}
                        >
                            <a className="tu-dib tu-tac breadcrumbItem">
                                {item.FileName}
                            </a>
                            <span className="separator tu-dib"> > </span>
                        </li>
                    ) : (
                        <li key={index} className="tu-fl tu-font-a2 ellipsis">
                            <span className=" tu-dib">...</span>
                            <span className=" tu-dib"> > </span>
                        </li>
                    )
            )}
        </ul>
    )
}

export default Breadcrumb
