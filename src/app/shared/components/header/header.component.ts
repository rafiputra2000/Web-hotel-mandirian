import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  storage: Storage = sessionStorage;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  // status: boolean = false;
  // clickEvent(){
  //     this.status = !this.status;
  // }

  onSubmitLogout(): void {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire('Deleted!', 'Data tabel telah dihapus.', 'success');
    //     this.authService.logout().subscribe();
    //     this.router.navigateByUrl('');
    //   }
    // });
    this.authService.logout().subscribe();
  }
}
