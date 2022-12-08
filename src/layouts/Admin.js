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
import React, { useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import Dashboard from "views/Dashboard";
import Entity from "views/entity";
import CreateEntity from "views/entity/create/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import routesData from "configs/routes";

function Admin() {
  const [color, setColor] = React.useState("black");
  const location = useLocation();
  const mainPanel = React.useRef(null);

  //const dispatch = useDispatch()
  const routes = routesData.routes

  /* useEffect(() => {
    dispatch(getAppRoutes())
  }, []) */ 


  // Dynamic Routes
  const getServerSideRoutes = (routes) => {
    return routes.length > 0 && routes.map((prop, key) => {
      if (true/*prop.layout === "/admin" && prop.methodType === 'GET'*/) {
        const layout = prop.layout || "/admin"
        return (
          <Route
            path={layout + prop.getRoute}
            render={(props) => <Entity {...prop} {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} routes={routes} />

        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar routes={routes}/>

          {/* Routes */}
          <div className="content">
            <Switch>
              <Route
                path="/admin/dashboard"
                component={Dashboard}
              />
              <Route
                path="/admin/create"
                component={CreateEntity}
              />
              {
                getServerSideRoutes(routes)
              }
            </Switch>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
