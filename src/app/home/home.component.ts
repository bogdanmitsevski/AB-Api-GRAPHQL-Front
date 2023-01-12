import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesService } from 'src/shared/services/devices.service';

import * as uuid from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  localStorage!: Storage
  buttonColor!: any
  sessionToken!: any

  constructor(private service: DevicesService, private router: Router) {

  }



  startExperimentNewToken() {
    this.service.addNewDevice(uuid.v4()).subscribe(
      (data) => {
        this.router.navigate(['/']);
        this.buttonColor = data!.data!.Device.experimentValue
      },
      error => {
        console.warn(error)
      }
    )
  }

  startExperimentOldToken() {
    this.service.addOldDevice(this.sessionToken || '').subscribe(
      (data) => {
        this.router.navigate(['/']);
        this.buttonColor = data!.data!.Device.experimentValue;
      },
      error => {
        console.warn(error)
      }
    )
  }


  ngOnInit() {
    if (this.service.checkIfTokenExists() == false) {
      this.startExperimentNewToken();
    }

    else {
      this.sessionToken = this.service.getToken();
      this.startExperimentOldToken();
    }
  }
}

