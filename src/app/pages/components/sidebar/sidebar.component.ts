import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  // User logout method
  logout() {
    this.adminService.logout();
  }
}
