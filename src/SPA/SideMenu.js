import React from 'react';
import {Menu} from "antd";
import {
    DashboardOutlined,
    HomeOutlined,
    PoweroffOutlined,
    UnorderedListOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const SideMenu = () => {
    const navigate = useNavigate();
    return (
        <div>

            <Menu
                onClick={({key}) => {
                    if (key === "signout") {
                        //TODO
                    } else {
                        navigate(key);
                    }
                }}
                defaultSelectedKeys={[window.location.pathname]}
                items={[
                    {label: "Wyszukaj maszynę", key: "/", icon: <HomeOutlined/>},
                    {label: "Dodaj zapytanie", key: "/dashboard", icon: <DashboardOutlined/>},
                    {
                        label: "Moje zapytania",
                        key: "/usersList",
                        icon: <UnorderedListOutlined/>,
                        children: [
                            {label: "Aktywne", key: "/usersList"},
                            {label: "Czekają na akceptacje", key: "/disabledUsers", danger:true},
                            {label: "Poprzednie", key: "/bannedUsers"}
                        ]
                    },
                    {label: "Moje dane", key: "/profile", icon: <UserOutlined/>},
                    {label: "Signout", key: "signout", icon: <PoweroffOutlined/>, danger: true}]}>

            </Menu>
        </div>
    );
};

export default SideMenu;