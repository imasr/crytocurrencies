import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = 'app';
  currencyList = [];
  filteredList = [];
  search: any;
  constructor(private router: Router) {}

  ngOnInit() {}
  filter(event) {
    if (event !== "") {
      this.filteredList = this.currencyList.filter(
        function(el) {
          return el.toLowerCase().indexOf(event.toLowerCase()) > -1;
        }.bind(this)
      );
    } else {
      this.filteredList = [];
    }
  }
  onSearch(data) {
    console.log(data);
    this.search = data;
    this.filteredList = [];
    this.router.navigate(['currencies', this.search]);
  }
}
