/*
 * @Author: jinli
 * @Date: 2023-02-09 10:08:44
 * @LastEditTime: 2023-02-22 16:48:25
 * @LastEditors: jinli
 * @Description:
 * @FilePath: \reactreview\src\pages\table\index.tsx
 */
import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import Sortable from 'sortablejs';
import type { ColumnsType } from 'antd/es/table';
import MyPanel from '@/components/MyPanel';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const Tables: React.FC = () => {
  const [dataSource, setDataSource] = useState<any>([...data]);
  // 拖拽初始化及逻辑
  const sortableTable = () => {
    // const { dispatch } = this.props; //不使用dva，可忽略
    const tab = document.getElementsByClassName('goodsTable');
    const el = tab[0].getElementsByClassName(
      'ant-table-tbody',
    )[0] as HTMLElement;
    Sortable.create(el, {
      animation: 100, // 动画参数
      onEnd(evt: any) {
        // 拖拽完毕之后发生，只需关注该事件
        const menuArr = [...data]; // 主菜单数组
        // Array.splice(指定修改的开始位置,要移除的个数,要添加进数组的元素)----语法
        // 先把拖拽元素的位置删除 再新的位置添加进旧的元素
        const oldEl = menuArr.splice(evt.oldIndex, 1);
        menuArr.splice(evt.newIndex, 0, oldEl[0]);
        setDataSource(menuArr);
      },
    });
  };
  return (
    <MyPanel>
      <MyPanel.Header>
        <span>默认表格</span>
      </MyPanel.Header>
      <Table columns={columns} dataSource={data} />
      <MyPanel.Header>
        <span>可拖拽表格</span>
      </MyPanel.Header>
      <div className="goodsTable" ref={sortableTable}>
        <Table
          columns={columns}
          dataSource={dataSource}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </MyPanel>
  );
};

export default Tables;
