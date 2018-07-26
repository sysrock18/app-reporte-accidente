import axios from 'axios'
import qs from 'qs'

let endpoint = 'http://localhost/reporte-accidente-admin/api'

let api = {
  user: {
    async login({ email, password }) {
      console.log(email, password);

      let { data } = await axios.post(`${endpoint}/login_user`, qs.stringify({
        email,
        password
      }), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })

      return data
    }
  }
}

export default api