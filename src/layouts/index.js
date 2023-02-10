/*
 * @Author: jinli
 * @Date: 2023-02-09 09:42:52
 * @LastEditTime: 2023-02-09 11:28:56
 * @LastEditors: jinli
 * @Description: 
 * @FilePath: \my-umi\src\layouts\index.js
 */
import React, { Fragment, useState } from 'react';
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
import './index.less'

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
  console.log(routesData);
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
  console.log(levelOne);
  const { routes } = levelOne;
  return <Fragment>{getMenu(routes)}</Fragment>;
};



export default withRouter(({ children, location }) => {
  const [current, setCurrent] = useState('');
  const handleClick = (e) => {
    history.push(e.key);
    setCurrent(e.key);
  };
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={handleClick}
            selectedKeys={[current]}>
            {CreateMenu()}
          </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <div>
          <Switch location={location}>{children.props.children}</Switch>
        </div>
      </Content>
    </Layout>
  </Layout>
  );
});
