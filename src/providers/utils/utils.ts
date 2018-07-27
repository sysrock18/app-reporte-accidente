import { Injectable } from '@angular/core'

@Injectable()
export class UtilsProvider {

  constructor() {

  }

  getCurrentDate() {
    const currentdate = new Date()
    const datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1) + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()

    return datetime
  }

}
