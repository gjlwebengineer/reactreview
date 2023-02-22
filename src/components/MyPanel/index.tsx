/*
 * @Author: jinli
 * @Date: 2023-02-22 16:04:01
 * @LastEditTime: 2023-02-22 16:42:20
 * @LastEditors: jinli
 * @Description:
 * @FilePath: \reactreview\src\components\MyPanel\index.tsx
 */
import React, { useState, useEffect, useRef } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import './index.less';

const MyPanel = (props: any) => {
  return (
    <div style={props.style} className="ui-panel theme-default">
      {props.children}
    </div>
  );
};

const Header = (props: any) => {
  const [expanded, setExpanded] = useState(true);
  const headerRef: any = useRef(null);
  const startAnimation = () => {
    // headerRef.current.parentElement.children 如下
    // 0: div..ui-panel-header
    // 1: div..ui-panel-body
    // 2: div.ui-panel-footer
    const fatherEle = headerRef?.current?.parentElement?.children[1]; // 获取 ui-panel-body
    const height = fatherEle.children[0].offsetHeight;
    if (expanded) {
      fatherEle.style.height = `${height}px`;
      fatherEle.style.opacity = '1';
    } else {
      fatherEle.style.height = `${height}px`; // 为了触发 transition
      fatherEle.style.opacity = '1';
      setTimeout(() => {
        fatherEle.style.height = '0px';
        fatherEle.style.opacity = '0';
      });
    }
  };
  useEffect(() => {
    if (!props.supportExpanded) {
      return;
    }
    startAnimation();
  }, [expanded]);

  const { supportExpanded, style, className, children } = props;
  const expandRow = () => {
    return (
      <div className="ui-panel-header-expanded-row">
        <div>
          <CaretRightOutlined
            type="caret-right"
            style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
            className="rotate"
          />
        </div>
        <div style={{ width: '100%' }}>{children}</div>
      </div>
    );
  };
  return (
    <div
      ref={headerRef}
      style={style}
      className={`${className} ui-panel-header`}
      onClick={(e) => {
        e.stopPropagation();
        setExpanded(!expanded);
      }}
    >
      {supportExpanded ? expandRow() : children}
    </div>
  );
};

const Body = (props: any) => {
  return (
    <div style={props.style} className={`${props.className} ui-panel-body`}>
      <div>{props.children}</div>
    </div>
  );
};

const Footer = (props: any) => {
  return (
    <div style={props.style} className={`${props.className} ui-panel-footer`}>
      {props.children}
    </div>
  );
};

MyPanel.Header = Header;
MyPanel.Body = Body;
MyPanel.Footer = Footer;

export default MyPanel;
