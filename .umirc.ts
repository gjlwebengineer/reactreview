/*
 * @Author: jinli
 * @Date: 2023-02-09 09:17:54
 * @LastEditTime: 2023-02-13 22:14:57
 * @LastEditors: jinli
 * @Description: 
 * @FilePath: \reactreview\.umirc.ts
 */
import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: './',
  history: {
    type: 'hash',
  },
  nodeModulesTransform: { //设置 node_modules 目录下依赖文件的编译方式
    type: 'none',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
  },
  theme: {
    'primary-color': '#00bc70', // 主题色
  },
  routes: [ //umi 的路由基于 react-router@5 实现，配置和 react-router 基本一致
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
      ]
    },
  ],
  fastRefresh: {}, //快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈
  ignoreMomentLocale: true, //忽略 moment 的 locale 文件，用于减少尺寸
  hash: true, //配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存
  targets: { //配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换
    ie: 9,
  },
  dva: {
    immer: true, // 表示是否启用 immer 以方便修改 reducer
    hmr: false, // 表示是否启用 dva model 的热更新
  },
});
