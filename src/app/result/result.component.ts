import { Component } from '@angular/core';
import { ExperimentsService } from 'src/shared/services/experiments.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  Devices!: number;
  devicesByGroupA!: number;
  devicesByGroupB!: number;
  devicesByGroupC!: number;
  experiments!: any;
  groupsA!: number;
  groupsB!: number;
  groupsC!: number;

  constructor(private service: ExperimentsService) {

  }

  ngOnInit() {
    this.service.getExperiments().subscribe(res => {
      {
      this.groupsA = res.data.totalDevicesByGroupA,
      this.groupsB = res.data.totalDevicesByGroupB,
      this.groupsC = res.data.totalDevicesByGroupC,
      this.Devices = res.data.allDevices,
      this.experiments = res.data.allExperiments
      }
      console.log(this.groupsA);
    })
  }
}
