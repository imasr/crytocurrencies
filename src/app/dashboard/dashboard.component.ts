import { Component, OnInit } from '@angular/core';
import { ApiTicketService } from '../api-ticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiTicketService) { }

  ngOnInit() {
      this.apiService.currencies().subscribe(res => {
          console.log(res)
      })
  }

}
