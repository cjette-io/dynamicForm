import http from "./api"

class DynamicFormService {
  getFormElements() {
    return http.get("/")
  }

  submit(data) {
    return http.post("/", data)
  }
}

export default new DynamicFormService()