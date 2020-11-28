import { Component, OnInit, Input } from '@angular/core';
import { HttpProgressState } from 'app/enums/HttpProgressState ';
import { HttpStateService } from 'app/services/http-state-service.service';
import { IHttpState } from 'app/interfaces/IHttpState';

@Component({
  selector: 'http-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  public loading = false;
  @Input() public filterBy: string | null = null;
  
  constructor(private httpStateService: HttpStateService) { }

  /**
   * receives all HTTP requests and filters them by the filterBy
   * values provided
   */
  ngOnInit() {
    this.httpStateService.state.subscribe((progress: IHttpState) => {
      if (progress && progress.url) {
        if (!this.filterBy) {
          this.loading = (progress.state === HttpProgressState.start) ? true : false;
        } else if (progress.url.indexOf(this.filterBy) !== -1) {
          this.loading = (progress.state === HttpProgressState.start) ? true : false;
        }
      }
    });
  }
}