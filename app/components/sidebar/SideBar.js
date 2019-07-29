import "./SideBar.scss";
import { Button, Icon, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
import Sider from "antd/lib/layout/Sider";
import { Link } from "react-router-dom";

const menuSet = [
  {
    endpoint: "/dashboard/user",
    icon: "user",
    name: "User",
    subs: [
      { endpoint: "/dashboard/user#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/user", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/book",
    icon: "book",
    name: "Book",
    subs: [
      { endpoint: "/dashboard/book#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/book", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/team",
    icon: "team",
    name: "Team",
    subs: [
      { endpoint: "/dashboard/team#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/team", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/category",
    icon: "tags",
    name: "Category",
    subs: [
      { endpoint: "/dashboard/category#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/category", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/author",
    icon: "solution",
    name: "Author",
    subs: [
      { endpoint: "/dashboard/author#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/author", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/booktype",
    icon: "file-exclamation",
    name: "Book type",
    subs: [
      { endpoint: "/dashboard/booktype#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/booktype", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/frequency",
    icon: "interaction",
    name: "Frequency",
    subs: [
      { endpoint: "/dashboard/frequency#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/frequency", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/publisher",
    icon: "bank",
    name: "Publisher",
    subs: [
      { endpoint: "/dashboard/publisher#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/publisher", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/status",
    icon: "alert",
    name: "Status",
    subs: [
      { endpoint: "/dashboard/status#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/status", icon: "ordered-list", name: "List" }
    ]
  }
];

export default () => {
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
        {MenuOptions(menuSet)}
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
