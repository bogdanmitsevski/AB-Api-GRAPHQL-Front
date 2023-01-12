import { HttpHeaders } from "@angular/common/http";
import { Injectable, SecurityContext } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { tap } from "rxjs";
import { DevicesResponse } from "../interfaces/devices";


const Device = gql`
  mutation Devices {
  Device {
  id
  uuid
  experimentId
  createdAt
  updatedAt
  experimentValue
  }

  }
`;

@Injectable({
  providedIn: 'root'
})

export class DevicesService {
  public uuid = '';
  public token = '';

  constructor(private apollo: Apollo) {

  }


  addNewDevice(uuid: string) {
    return this.apollo.mutate<DevicesResponse>({
      mutation: Device,
      context: {
        headers: new HttpHeaders().set('device-token', uuid)
      }
    }
    )

      .pipe(
        tap(
          (data) => {
            document.cookie = `device-token = ${data!.data!.Device.uuid}; max-age = 10`
          }
        )
      )
  }

  addOldDevice(token: string) {
    return this.apollo.mutate<DevicesResponse>({
      mutation: Device,
      context: {
        headers: new HttpHeaders().set('device-token', token)
      }
    })
  }
  checkIfTokenExists() {
    return !!this.getToken();
  }

  getToken() {
    let name_cook = 'device-token' + "=";
    let spl = document.cookie.split(";");
    for (let i = 0; i < spl.length; i++) {
      let c = spl[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(name_cook) == 0) {
        return c.substring(name_cook.length, c.length);
      }
    }
    return null;

  }
}