import { Injectable } from '@angular/core'
import qs from 'qs'
import axios from 'axios'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ApiProvider {

  endpoint = 'http://localhost:8080/reporte-accidente-admin/api'

  constructor() {
    
  }

  async login({ email, password }) {
    try {
      const data = await axios.post(`${this.endpoint}/login_user`, qs.stringify({
        email,
        password
      }), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })

      return data

    } catch(err) {
      console.error(err)
      return { data: 'internal_error' }
    }
  }

  async register({ name, email, password }) {
    try {
      const { data } = await axios.post(`${this.endpoint}/register_user`, qs.stringify({
          name,
          email,
          password
        })
      )

      return data

    } catch(err) {
      console.error(err)
      return false
    }
  }

  async getAccidentTypes({ http_user, http_pass }) {
    try {
      const resp = await axios.get(`${this.endpoint}/get_accident_types`, {
        auth: {
          username: http_user,
          password: http_pass
        },
        headers: {
          "Content-Type": "application/json"
        }
      })

      console.log(resp)

      return resp

    } catch(err) {
      console.error(err)
      return { data: false }
    }
  }

  async sendAccident({ user, accident_type, comments, date, http_user, http_pass }) {
    try {
      const { data } = await axios.post(`${this.endpoint}/register_accident`, qs.stringify({
          user,
          accident_type,
          comments,
          date
        }),
        {
          auth: {
            username: http_user,
            password: http_pass
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )

      return data

    } catch(err) {
      console.error(err)
      return false
    }
  }

}
