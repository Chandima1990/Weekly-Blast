import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'app/services/user-management.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private userManagementService: UserManagementService) { }

  ngOnInit() {
  }

  GetUsers() {
    this.userManagementService.GetUsers()
  }
}
