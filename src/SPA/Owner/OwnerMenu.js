import React from 'react';
import {useNavigate} from "react-router-dom";
import {Menu} from "antd";
import {
    DashboardOutlined,
    HomeOutlined,
    PoweroffOutlined,
    UnorderedListOutlined,
    UserOutlined
} from "@ant-design/icons";

const OwnerMenu = () => {
    const navigate = useNavigate();
    return (
        <div>

            <Menu
                onClick={({key}) => {
                    if (key === "signout") {
                        //TODO
                        localStorage.removeItem("role");
                        localStorage.removeItem("name");
                        localStorage.removeItem("currentToken");
                        navigate("/");
                    } else {
                        navigate(key);
                    }
                }}
                defaultSelectedKeys={[window.location.pathname]}
                items={[
                    {label: "Dodaj ofertę", key: "/owner/addOffer", icon: <HomeOutlined/>},
                    {label: "Moje maszyny", key: "/owner/machines", icon: <DashboardOutlined/>},
                    {
                        label: "Moje oferty",
                        key: "/owner/offers",
                        icon: <UnorderedListOutlined/>,
                        children: [
                            {label: "W trakcie licytacji", key: "/owner/offers/active"},
                            {label: "W trakcie realizacji", key: "/owner/offers/inProgress", danger:true},
                            {label: "Poprzednie", key: "/owner/offers/past"}
                        ]
                    },
                    {label: "Moje dane", key: "/owner/profile", icon: <UserOutlined/>},
                    {label: "Signout", key: "signout", icon: <PoweroffOutlined/>, danger: true}]}>

            </Menu>
        </div>
    );
};


export default OwnerMenu;