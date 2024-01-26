import { Component, OnInit } from '@angular/core';
import { ListUser } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { buttonConfig } from '../../../../shared/utils/button/buttonConfig';
import { toasterConfigDefault } from '../../../../shared/utils/toaster/toasterConfig';
import { Pagination, PaginationOptions } from '../../models/paggination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{

  loading: boolean = false;
  buttonConfig = buttonConfig;
  toasterConfig = toasterConfigDefault;
  listUser: ListUser[] = [];
  user: ListUser|any;
  
  paginationOptions: PaginationOptions = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 100,
  };
  pagination:Pagination = new Pagination(this.paginationOptions);

  constructor(
    private service: UsersService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.getListUser();
  }

  defaultPagination(){
    this.pagination = new Pagination({
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 100,
    });
  }

  searchUser(event:any){
    this.defaultPagination();
    if(event.target.value != ''){
      this.service.searchUserAPI(event.target.value).subscribe(
        (data)=>{
          this.listUser = data;
          this.loading = false;

          this.toasterConfig.isShow = true;
          this.pagination = new Pagination({
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: this.listUser.length,
          });
        },
        (error: HttpErrorResponse)=>{
          this.loading = false;
          this.toasterConfig.isShow = true;
          this.toasterConfig.icon = 'error';
          this.toasterConfig.message = 'Gagal Meload Data';
        }
      )
    }else{
      this.getListUser();
    }
  }

  getListUser() {
    this.loading = true;
    this.service.listUserAPI().subscribe(
      (data:ListUser[]) => {
        this.listUser = data.slice(0,100);
        this.loading = false;

        this.toasterConfig.isShow = true;
        this.toasterConfig.icon = 'success';
        this.toasterConfig.message = 'Berhasil Meload Data';
        
        this.pagination = new Pagination({
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: this.listUser.length,
        });
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toasterConfig.isShow = true;
        this.toasterConfig.icon = 'error';
        this.toasterConfig.message = 'Gagal Meload Data';
      }
    );
  }

  showPerPage(event:any){
    this.pagination = new Pagination({
      currentPage: 1,
      itemsPerPage: Number(event.target.value),
      totalItems: this.listUser.length,
    });
  }

  gotoPage(page:number){
    this.pagination = new Pagination({
      currentPage: page,
      itemsPerPage: this.pagination.itemsPerPage,
      totalItems: this.listUser.length,
    });
  }

  // MODALS
  btnOpenModals(index: number) {
    const modals = document.getElementById('myModals') as HTMLElement;
    modals.classList.remove('hidden');
    this.user = this.listUser[index];
  }

  btnClsoeModals() {
    const modals = document.getElementById('myModals') as HTMLElement;
    modals.classList.add('hidden');
  }

  deleteUser(){
    this.service.deleteUserAPI(this.user.id).subscribe(
      (data:ListUser) => {
        this.loading = false;

        this.toasterConfig.isShow = true;
        this.toasterConfig.icon = 'error';
        this.toasterConfig.message = `Berhasil Menghapus Data User dengan ID ${this.user.id}`;
        
        this.pagination = new Pagination({
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: this.listUser.length,
        });
        this.btnClsoeModals();
        this.getListUser();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toasterConfig.isShow = true;
        this.toasterConfig.icon = 'error';
        this.toasterConfig.message = 'Gagal Menghapus Data User';
      }
    );
  }

  btnDetail(index: number) {
    this.user = this.listUser[index];
    this.router.navigate([`/users/detail/${this.user.id}`]);
  }

  btnTambahUser(){
    this.router.navigate([`/users/tambah`]);
  }

}

