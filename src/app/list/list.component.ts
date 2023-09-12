import { Component, OnInit } from '@angular/core';
import { TicketServiceService } from '../service/ticket-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  overAllData: any[]=[];

  constructor(private TicketServiceService: TicketServiceService) { }

  ngOnInit(): void {
    this.getData();
  } 

  getData() {
    this.TicketServiceService.list().subscribe((item:any)=> {
      this.overAllData = item;
    })
  }

}
