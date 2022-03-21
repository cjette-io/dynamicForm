import axios from "axios";

export default axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/http://vb-react-exam.netlify.app/api/form",
  headers: {
    "Content-type": "application/json",
  },
});
