import { Component } from '@angular/core';
import { ExperimentsService } from 'src/shared/services/experiments.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private service: ExperimentsService) {

  }

  ngOnInit() {
    this.service.getExperiments().subscribe(res => {
      {
        console.log(res);
      }
    })
  }
}
