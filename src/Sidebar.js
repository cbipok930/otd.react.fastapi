import React from "react";
import { Link } from "react-router-dom";
class Sidebar extends React.Component{
    render() {
        return         <div class="panel">
        <Link className="sidebarButton" style={{textDecoration: "none"}} to="/">
            <p>Введение</p>
        </Link>
        <Link className="sidebarButton" style={{textDecoration: "none"}} to="/main">
            <p>Описание</p>
        </Link>
        <Link className="sidebarButton" style={{textDecoration: "none"}} to="/conclusion">
            <p>Заключение</p>
        </Link>
        <Link className="sidebarButton" style={{textDecoration: "none"}} to="/posts">
            <p>Посты</p>
        </Link>
        </div>;
    }
}

export default Sidebar;