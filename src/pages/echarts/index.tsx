import React, { useRef } from 'react';
import MyChart, { MyChartOption } from '@/components/MyChart';
import datas from "../../../public/data.json"
import tableData from '../../../public/life-expectancy-table.json'
const MyPage: React.FC = () => {
  const updateFrequency = 2000;
  const dimension = 0;

  // 获取子组件的实例和方法
  let childRef = useRef<any>(null);

  const countryColors: Record<string, string> = {
    Australia: '#00008b',
    Canada: '#f00',
    China: '#ffde00',
    Cuba: '#002a8f',
    Finland: '#003580',
    France: '#ed2939',
    Germany: '#000',
    Iceland: '#003897',
    India: '#f93',
    Japan: '#bc002d',
    'North Korea': '#024fa2',
    'South Korea': '#000',
    'New Zealand': '#00247d',
    Norway: '#ef2b2d',
    Poland: '#dc143c',
    Russia: '#d52b1e',
    Turkey: '#e30a17',
    'United Kingdom': '#00247d',
    'United States': '#b22234'
  };

  interface Flag {
    name: string;
    emoji: string;
  }
  const flags: Flag[] = datas;
  const data = tableData;
  const years: (string | number)[] = [];
  for (let i = 0; i < data.length; ++i) {
    if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
      years.push(data[i][4]);
    }
  }

  function getFlag(countryName: string) {
    if (!countryName) {
      return '';
    }
    return (
      flags.find(function (item) {
        return item.name === countryName;
      }) || {}
    ).emoji;
  }
  let startIndex = 10;
  let startYear = years[startIndex];

  const option = {
    grid: {
      top: 10,
      bottom: 30,
      left: 150,
      right: 80
    },
    xAxis: {
      max: 'dataMax',
      axisLabel: {
        formatter: function (n: number) {
          return Math.round(n) + '';
        }
      }
    },
    dataset: {
      source: data.slice(1).filter(function (d: (string | number)[]) {
        return d[4] === startYear;
      })
    },
    yAxis: {
      type: 'category',
      inverse: true,
      max: 10,
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: function (value: any) {
          return value + '{flag|' + getFlag(value) + '}';
        },
        rich: {
          flag: {
            fontSize: 25,
            padding: 5
          }
        }
      },
      animationDuration: 300,
      animationDurationUpdate: 300
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: 'column',
        type: 'bar',
        itemStyle: {
          color: function (param) {
            return countryColors[(param.value as number[])[3]] || '#5470c6';
          }
        },
        encode: {
          x: dimension,
          y: 3
        },
        label: {
          show: true,
          precision: 1,
          position: 'right',
          valueAnimation: true,
          fontFamily: 'monospace'
        }
      }
    ],
    // Disable init animation.
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    graphic: {
      elements: [
        {
          type: 'text',
          right: 160,
          bottom: 60,
          style: {
            text: startYear,
            font: 'bolder 80px monospace',
            fill: 'rgba(100, 100, 100, 0.25)'
          },
          z: 100
        }
      ]
    }
  } as MyChartOption;

  // console.log(option);
  // myChart.setOption<echarts.EChartsOption>(option);
  // childRef?.current?.cInstance.setOption(option);

  for (let i = startIndex; i < years.length - 1; ++i) {
    (function (i) {
      setTimeout(function () {
        updateYear(years[i + 1]);
      }, (i - startIndex) * updateFrequency);
    })(i);
  }

  function updateYear(year: (string | number)) {
    let source = data.slice(1).filter(function (d: (string | number)[]) {
      return d[4] === year;
    });
    (option as any).series[0].data = source;
    (option as any).graphic.elements[0].style.text = year;
    // myChart.setOption<echarts.EChartsOption>(option);
    // childRef?.current?.cInstance?.setOption(option);
    console.log(childRef);
  }

  const option1 = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  } as MyChartOption;

  const option2 = {
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: 'Apache ECharts',
            fontSize: 80,
            fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#000',
            lineWidth: 1
          },
          keyframeAnimation: {
            duration: 3000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0]
                }
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent'
                }
              },
              {
                percent: 1,
                style: {
                  fill: 'black'
                }
              }
            ]
          }
        }
      ]
    }
  } as MyChartOption;

  const option3 = {
    graphic: {
      elements: [
        {
          type: 'group',
          left: 'center',
          top: 'center',
          children: new Array(7).fill(0).map((val, i) => ({
            type: 'rect',
            x: i * 20,
            shape: {
              x: 0,
              y: -40,
              width: 10,
              height: 80
            },
            style: {
              fill: '#5470c6'
            },
            keyframeAnimation: {
              duration: 1000,
              delay: i * 200,
              loop: true,
              keyframes: [
                {
                  percent: 0.5,
                  scaleY: 0.3,
                  easing: 'cubicIn'
                },
                {
                  percent: 1,
                  scaleY: 1,
                  easing: 'cubicOut'
                }
              ]
            }
          }))
        }
      ]
    }
  } as MyChartOption;
  return (
    <div className='echarts'>
      {/* <MyChart option={option} ref={childRef} /> */}
      <MyChart option={option2} />
      <MyChart option={option3} />
      <MyChart option={option1} />
    </div>
  );
}

export default MyPage;
