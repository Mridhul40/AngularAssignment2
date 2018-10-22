import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service'
import {first} from 'rxjs/operators';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
currentUser:User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
    .pipe(first())
    .subscribe(
      (data:any)=>{
        this.currentUser = data.user ;
      });
  }

}
