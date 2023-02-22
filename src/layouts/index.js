/*
 * @Author: jinli
 * @Date: 2023-02-09 09:42:52
 * @LastEditTime: 2023-02-22 19:26:37
 * @LastEditors: jinli
 * @Description:
 * @FilePath: \reactreview\src\layouts\index.js
 */
import React, { Fragment, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { withRouter, Switch, history } from 'umi';
import * as Icon from '@ant-design/icons';
import routerConfig from '../../config/router.config.js';
import './index.less';

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;
// 创建icon
const getIcon = (iconName) => {
  const res = React.createElement(Icon[iconName], {
    style: { fontSize: '16px' },
  });
  return res;
};
// 获取子菜单
const getSubMenu = (routesData) => {
  routesData.map((item) => {
    return <Menu.Item key={item.path}>{item.name}</Menu.Item>;
  });
};
// 获取菜单 此处只遍历了2层，应该使用深度优先或广度优先算法对路由配置结构进行处理
const getMenu = (routesData) => {
  // console.log(routesData);
  const menuData = [];
  for (let i = 0; i < routesData.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(routesData[i], 'routes')) {
      menuData.push(
        <SubMenu
          key={routesData[i].path}
          title={routesData[i].name}
          icon={getIcon(routesData[i].icon)}
        >
          {getMenu(routesData[i].routes)}
        </SubMenu>,
      );
    } else {
      menuData.push(
        <Menu.Item key={routesData[i].path} icon={getIcon(routesData[i].icon)}>
          {routesData[i].name}
        </Menu.Item>,
      );
    }
  }
  return menuData;
};
const CreateMenu = () => {
  const [levelOne] = routerConfig;
  // console.log(levelOne);
  const { routes } = levelOne;
  return <Fragment>{getMenu(routes)}</Fragment>;
};
/**
 * @des 监控用户行为（界面停留时间） #详情可以看 html/monitor
 */
const addMonitorPage = () => {
  try {
    window.addEventListener('pageshow', () => {
      window.timeStr = new Date().getTime();
      // alert("开始监控")
    });
    window.addEventListener('load', () => {
      window.timeStr = new Date().getTime();
      // alert("开始监控")
    });
    window.addEventListener('pagehide', () => {
      let t = (new Date().getTime() - window.timeStr) / 1000;
      localStorage.setItem('time', t);
      window.timeStr = new Date().getTime();
      let result = {
        curTime: new Date(),
        url: window.location.href,
        stayTime: localStorage.getItem('time'),
      };
      //重置数据
      window.timeStr = new Date().getTime();
      //发送监控数据
      console.table(result);
      // localStorage.clear("timestr")
      // alert("停留了"+localStorage.getItem("time")+"秒")
    });

    // onhashchange 好像是vue的
    window.addEventListener('hashchange', () => {
      let t = (new Date().getTime() - window.timeStr) / 1000;
      localStorage.setItem('time', t);
      window.timeStr = new Date().getTime();
      let result = {
        curTime: new Date(),
        url: window.location.href,
        stayTime: localStorage.getItem('time'),
      };
      //重置数据
      window.timeStr = new Date().getTime();
      //发送监控数据
      console.table(result);
      // localStorage.clear("timestr")
      // alert("停留了"+localStorage.getItem("time")+"秒")
    });
  } catch (error) {
    console.log('性能信息上报异常', error);
  }
};

export default withRouter(({ children, location }) => {
  const [current, setCurrent] = useState('');
  const handleClick = (e) => {
    history.push(e.key);
    setCurrent(e.key);
  };
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    addMonitorPage();
  }, []);
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleClick}
          selectedKeys={[current]}
        >
          {CreateMenu()}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            },
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            // minHeight: 280,
            height: '100vh',
            overflow: 'scroll',
          }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <Switch location={location}>{children.props.children}</Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
});
