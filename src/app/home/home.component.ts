import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { TicketServiceService } from "../service/ticket-service.service";
import { Router } from "@angular/router";
import { IResponse } from "../model/mode.type";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userForm = new FormGroup({
    fromLocation: new FormControl(""),
    toLocation: new FormControl(""),
  });

  @ViewChild("overflowMenuTem", { read: ElementRef }) overflowMenuTem: ElementRef | undefined;
  
  indexIncrement = 0;
  indexIncrements = 0;
  totalPassengers = 0;
  overflowMenuFlag = false;

  constructor(private ticketService: TicketServiceService, private router: Router) {}

  @HostListener("click", ["$event"])
  closePop(event: Event) {
    if (this.overflowMenuFlag && this.overflowMenuTem) {
      const isOutside = !this.overflowMenuTem.nativeElement.contains(event.target);
      if (isOutside) {
        this.overflowMenuFlag = false;
      }
    }
  }

  ngOnInit(): void {}

  onClickMinus() {
    if (this.indexIncrement > 0) {
      this.indexIncrement--;
      this.decrementTotalPassengers();
    }
  }

  onClickPlus() {
    this.indexIncrement++;
    this.updateTotalPassengers();
  }

  onClickRightMinus() {
    if (this.indexIncrements > 0) {
      this.indexIncrements--;
      this.decrementTotalPassengers();
    }
  }

  onClickLeftPlus() {
    this.indexIncrements++;
    this.updateTotalPassengers();
  }

  submit() {
    const fromLocation = this.userForm.value.toLocation;
    const toLocation = this.userForm.value.fromLocation;

    this.userForm.patchValue({
      fromLocation,
      toLocation,
    });
  }

  private updateTotalPassengers() {
    this.totalPassengers = this.indexIncrements + this.indexIncrement;
  }

  private decrementTotalPassengers() {
    if (this.totalPassengers) {
      this.totalPassengers--;
    }
  }

  onClick() {
    const payload = {
      fromLocation: this.userForm.value.fromLocation,
      toLocation: this.userForm.value.toLocation,
      passengers: this.totalPassengers,
    };

    this.ticketService.create(payload).subscribe((res: IResponse) => {
      this.router.navigate(['/list']);
    });
  }
}
