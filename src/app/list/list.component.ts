import { Component, OnInit } from "@angular/core";
import { TicketServiceService } from "../service/ticket-service.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  overAllData: any[] = [];

  constructor(
    private TicketServiceService: TicketServiceService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.getData();
      this.toastrService.success("Data uploaded successfully");
    }, 2000);

  }

  getData() {
    this.TicketServiceService.list().subscribe((item: any) => {
      this.overAllData = item;
    });
  }
}
