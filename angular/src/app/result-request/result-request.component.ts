import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-result-request',
  templateUrl: './result-request.component.html',
  styleUrls: ['./result-request.component.scss']
})
export class ResultRequestComponent {
  @Input() result: any;
}
