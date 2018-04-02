import * as React from "react"
import "./index.scss"
import * as cn from "classnames"

/*
 type ?: number  默认为:0 , 传数值0 到 2 用于展示弹层的小图标   0 是 ✔  1是 ！ 2 是 X
 tipContent ?: string   默认为:删除成功 传值是弹层提示的内容
 restProps ?: any 可选参数 用于显示弹出层的样式
 disappearTime ?: any  可选参数 传入消失时间 如果不传将一直显示在页面上
*/
interface RemindingBoxProps {
    type?: number
    tipContent?: string
    restProps?: any
    disappearTime?: number
    onDisappearFunc?: () => void
    visible: boolean
}
interface RemindingBoxState {
    visible: boolean
}
export default class RemindingBox extends React.Component<
    RemindingBoxProps,
    RemindingBoxState
> {
    static defaultProps = {
        type: 0,
        tipContent: "删除成功",
    }
    _time: any
    constructor(props: RemindingBoxProps) {
        super(props)
        // 设置  state
        this.state = {
            visible: props.visible,
        }
    }
    setTimeFunc = () => {
        const { disappearTime, onDisappearFunc } = this.props
        if (disappearTime) {
            this._time = setTimeout(() => {
                onDisappearFunc && onDisappearFunc()
            }, disappearTime)
        }
    }
    componentDidMount() {
        this.setTimeFunc()
    }
    componentDidUpdate() {
        this.setTimeFunc()
    }
    componentWillUnmount() {
        this._time && clearTimeout(this._time)
    }
    componentWillReceiveProps(nextProps: RemindingBoxProps) {
        if ("visible" in nextProps) {
            this.setState({ visible: nextProps.visible })
        }
        this._time && clearTimeout(this._time)
    }
    render() {
        const { visible } = this.state
        const remindClass = cn({
            "reminding-box-container": true,
            "tu-vh": !visible,
        })
        let imgChoice = (type: any) => {
            let imgSpace
            if (type == 0) {
                imgSpace = (
                    <span className="tip-icon tu-icon-check tu-icon-a1 tu-dib" />
                )
            } else if (type == 1) {
                imgSpace = (
                    <span className="tip-icon tu-icon-warning tu-icon-a1  tu-dib" />
                )
            } else if (type == 2) {
                imgSpace = (
                    <span className="tip-icon tu-icon-cross tu-icon-a1  tu-dib" />
                )
            }
            return imgSpace
        }
        return (
            <div className={remindClass} style={this.props.restProps}>
                {imgChoice(this.props.type)}
                <span className="tu-font-a1 tu-dib tip-content ">
                    {this.props.tipContent}
                </span>
            </div>
        )
    }
}
