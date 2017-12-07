import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toList(event) { 
    this.router.navigate(['app-productlist'])
  }
  toAdd(event) { 
    this.router.navigate(['app-productadd'])
  }
}
