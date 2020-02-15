import './SideBar.scss';
import { Icon, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useState } from 'react';
import Sider from 'antd/lib/layout/Sider';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideBar = props => {
  const [collapsed, setCollapse] = useState(true);
  const toggleCollapsed = () => setCollapse(!collapsed);
  const menuOptions = menuSet =>
    menuSet.map((set, i) =>
      set.subs ? (
        <SubMenu key={i} title={<LinkWithIcon {...set} />}>
          {menuOptions(set.subs)}
        </SubMenu>
      ) : (
        <Menu.Item key={i}>
          <LinkWithIcon {...set} />
        </Menu.Item>
      )
    );
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" inlineCollapsed={collapsed}>
        {menuOptions(props.menuSet)}
      </Menu>
    </Sider>
  );
};

const LinkWithIcon = link => (
  <Link to={link.endpoint}>
    <Icon type={link.icon} />
    <span>{link.name}</span>
  </Link>
);

SideBar.propTypes = {
  menuSet: PropTypes.array
};

export default SideBar;
