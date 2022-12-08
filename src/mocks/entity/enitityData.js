
 const entityData = {
    id: 23123726478,
    entityName: "Doctors",
    primaryKey: "id",
    columns: [
      {
        name: "id",
        type: "number",
        isNull: false,
        isForiegnKey: false,
        visibleInList: false
      },
      {
        name: "name",
        type: "string",
        isNull: false,
        isForiegnKey: false,
        visibleInList: true
      },
      {
        name: "gender",
        type: "string",
        isNull: false,
        isForiegnKey: false,
        visibleInList: true,
        enum: [
          "Male",
          "Female"
        ]
      },
      {
        name: "joining_date",
        type: "date",
        isNull: false,
        visibleInList: true,
        minVal: "10-06-2022"
      },
      {
        name: "cnic",
        type: "string",
        isNull: false,
        visibleInList: true,
        minVal: 13,
        maxVal: 13
      },
      {
        name: "address",
        type: "string",
        isNull: false,
        visibleInList: true
      },
      {
        name: "education",
        type: "number",
        isForiegnKey: true,
        ref: "?type=doctors",
        refCol: [
          "id",
          "education"
        ],
        isNull: false,
        visibleInList: false
      },
      {
        name: "speciality",
        type: "string",
        isNull: false,
        visibleInList: true
      },
      {
        name: "country",
        type: "number",
        isForiegnKey: true,
        ref: "?type=hospital",
        refCol: [
          "id",
          "location"
        ],
        isNull: false,
        visibleInList: false
      },
      {
        name: "username",
        type: "string",
        isNull: false,
        visibleInList: true
      },
      {
        name: "phone",
        type: "phone",
        isNull: false,
        visibleInList: false
      }
    ],
    data: [
      {
        id: 1,
        name: "John",
        gender: "John",
        joining_date: "08-30-2022",
        cnic: "4210159637822",
        address: "Karachi",
        speciality: "Neurologist",
        phone: "03342345566",
        education: 1,
        country: 2,
        username: "hello"
      },
      {
        id: 2,
        name: "John",
        gender: "John",
        joining_date: "08-30-2022",
        cnic: "4210159637822",
        address: "Karachi",
        speciality: "Neurologist",
        phone: "03342345566",
        education: 8
      },
      {
        id: 3,
        name: "John",
        gender: "John",
        joining_date: "08-30-2022",
        cnic: "4210159637822",
        address: "Karachi",
        speciality: "Neurologist",
        phone: "03342345566",
        education: 8
      },
      {
        id: 4,
        name: "John",
        gender: "John",
        joining_date: "08-30-2022",
        cnic: "4210159637822",
        address: "Karachi",
        speciality: "Neurologist",
        phone: "03342345566",
        education: 8
      }
    ]
}

export default entityData;