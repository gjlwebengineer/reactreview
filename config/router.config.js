/*
 * @Author: jinli
 * @Date: 2023-02-09 10:25:14
 * @LastEditTime: 2023-02-13 22:13:51
 * @LastEditors: jinli
 * @Description: 
 * @FilePath: \reactreview\config\router.config.js
 */
const routerConfig = [ //umi 的路由基于 react-router@5 实现，配置和 react-router 基本一致
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/echarts',
        name: '图表',
        exact: true,
        icon: 'SettingOutlined',
        component: '@/pages/echarts'
      },
      {
        path: '/table',
        name: '表格',
        exact: true,
        icon: 'SettingOutlined',
        component: '@/pages/table'
      },
      {
        path: '/form',
        name: '表单',
        exact: true,
        icon: 'SettingOutlined',
        component: '@/pages/form'
      },
      {
        path: '/form',
        name: '测试222',
        exact: true,
        icon: 'SettingOutlined',
        component: '@/pages/form'
      }
    ]
  },
]
export default routerConfig;