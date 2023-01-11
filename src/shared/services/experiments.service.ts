import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { ExperimentsResponse } from "../interfaces/experiments";

const totalDevicesByGroups = gql`
     query totalDevicesByGroups {
      totalDevicesByGroupA,
      totalDevicesByGroupB,
      totalDevicesByGroupC,
      allDevices,
      allExperiments {
      id,
      key,
      value
      }
     }
    `;

@Injectable({
  providedIn: 'root'
})

export class ExperimentsService {

  constructor(private apollo: Apollo) {
  }

  getExperiments() {
    return this.apollo.query<ExperimentsResponse>({ query: totalDevicesByGroups })
  }
}