/*
 * @Author: jinli
 * @Date: 2023-02-09 11:10:41
 * @LastEditTime: 2023-02-15 22:48:25
 * @LastEditors: jinli
 * @Description: 
 * @FilePath: \reactreview\src\components\MyChart\index.tsx
 */
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  DatasetComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GraphicComponent
} from 'echarts/components';
import { BarChart, BarSeriesOption, LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import { EChartsType } from 'echarts/core';

echarts.use([
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LineChart,
  BarChart,
  UniversalTransition,
  SVGRenderer,
  GraphicComponent,
]);

export type MyChartOption = echarts.ComposeOption<
  | DatasetComponentOption
  | DataZoomComponentOption
  | GridComponentOption
  | LegendComponentOption
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | HTMLDivElement
>;
export interface MyChartProps {
  option: MyChartOption;
  ref?: MyChartOption;
}
const MyChart: React.FC<MyChartProps> = ({ option, ref }) => {
  const cRef = useRef<HTMLDivElement>(null);
  const cInstance = useRef<EChartsType>();

  // 初始化注册组件，监听 cRef 和 option 变化
  useEffect(() => {
    if (cRef.current) {
      // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
      cInstance.current = echarts.getInstanceByDom(cRef.current);
      if (!cInstance.current) {
        cInstance.current = echarts.init(cRef.current, undefined, {
          renderer: 'svg',
        });
      }
      // 设置配置项
      if (option) cInstance.current?.setOption(option);
    }
  }, [cRef, option]);

  // 把实例传给ref，然后父组件可以通过ref获取子组件的变量和方法。
  useImperativeHandle(ref, () => {
    if (cRef.current) {
      cInstance.current = echarts.getInstanceByDom(cRef.current);
    }
    return { cInstance: cInstance.current }
  });

  return (
    <div ref={cRef} className='echartWrap' style={{ width: '100%', height: '100%' }} />
  );
};

export default MyChart;
