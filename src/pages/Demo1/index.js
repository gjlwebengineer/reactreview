/*
 * @Author: jinli
 * @Date: 2023-02-09 09:27:11
 * @LastEditTime: 2023-02-09 09:29:17
 * @LastEditors: jinli
 * @Description: 
 * @FilePath: \my-umi\src\pages\Demo1\index.js
 */
import React, { Fragment } from 'react';
import { connect } from 'dva'

@connect(({ firstDemoModel}) => ({
    firstDemoModel,
}))
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <Fragment>
                <div>开始配置dva.js </div>
            </Fragment>
        )
    }
}

export default Demo;

