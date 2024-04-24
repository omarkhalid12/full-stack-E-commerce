import Cookies from "universal-cookie";

const cookie = new Cookies();

class cookieService {
  get(name) {
    return cookie.get(name);
  }
  set(name, value, options) {
    return cookie.set(name, value, options);
  }
  remove(name) {
    return cookie.remove(name);
  }
}

export default new cookieService();