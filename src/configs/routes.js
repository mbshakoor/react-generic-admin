const routesData = {
    routes: [
        {
          id: 1,
          entityName: "doctors",
          name: "Doctors",
          getRoute: "/entity/doctor",
          createRoute: "/doctor/create",
          editRoute: "/doctor/edit/:id",
          delRoute: "/doctor/del/:id",
          getByIdRoute: "/entity/doctor/:id",
          keysRoute: "/options",
          //parentId: 0
          //layout: "/admin",
          //methodType: "GET",
        },
        {
          id: 1,
          entityName: "hospital",          
          name: "Hospital",
          getRoute: "/entity/hospital",
          createRoute: "/hospital/create",
          editRoute: "/hospital/edit/:id",
          delRoute: "/hospital/del/:id",
          getByIdRoute: "/entity/hospital/:id",
          keysRoute: "/options",
          //parentId: 0
          //layout: "/admin",
          //methodType: "GET",
        }
      ]
}

export default routesData