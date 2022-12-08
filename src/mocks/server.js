import axios from "axios";
const Adapter = require("axios-mock-adapter");

const mock = new Adapter(axios);
export default mock;

