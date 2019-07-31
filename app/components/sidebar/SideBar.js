import "./SideBar.scss";
import { Icon, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
import Sider from "antd/lib/layout/Sider";
import { Link } from "react-router-dom";

export default props => {
  const [collapsed, setCollapse] = useState(true);
  const toggleCollapsed = () => setCollapse(!collapsed);
  const MenuOptions = menuSet =>
    menuSet.map((set, i) =>
      set.subs ? (
        <SubMenu key={i} title={<LinkWithIcon {...set} />}>
          {MenuOptions(set.subs)}
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
        {MenuOptions(props.menuSet)}
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
