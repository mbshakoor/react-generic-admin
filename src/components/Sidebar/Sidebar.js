/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Sidebar({ color, routes }) {
  const location = useLocation();

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };


  return (
    <div className="sidebar" data-color={color}>
      <div className="sidebar-background" />
      <div className="sidebar-wrapper">

        {/* Logo */}
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="/" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img src={require("assets/img/reactlogo.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="/">
            Site Admin
          </a>
        </div>

        {/* Navigation */}
        <Nav>
          <li className={
            activeRoute("/admin/dashboard")
          }
          >
            <NavLink
              to={"/admin/dashboard"}
              className="nav-link"
              activeClassName="active"
            >
              <p>Dashboard</p>
            </NavLink>
          </li>

          {/* Dynamic Routes */}
          {routes.length > 0 && routes.map((prop, key) => {
            const layout = prop.layout || "/admin"
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(layout + prop.getRoute)
                  }
                  key={key}
                >
                  <NavLink
                    to={layout + prop.getRoute}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
