import axios from "axios";
import "dotenv/config";

const apiContact = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 8000,
});

export default apiContact;
