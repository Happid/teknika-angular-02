import { Component, OnInit } from '@angular/core';
import { buttonConfig } from '../../../../shared/utils/button/buttonConfig';
import { FormBuilder, Validators } from '@angular/forms';
import { toasterConfigDefault } from '../../../../shared/utils/toaster/toasterConfig';
import { ListUser } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent implements OnInit{

  buttonConfig = buttonConfig;
  toasterConfig = toasterConfigDefault;
  form: ListUser | any;
  loading: boolean = true;
  isBtnSave: boolean = true;
  userIdFromRoute: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    
    const routeParams = this.route.snapshot.paramMap;
    this.userIdFromRoute = Number(routeParams.get('id'));
    
    // menentukan apakah tambah user atau detail 
    if(this.userIdFromRoute === 0){
      this.buttonConfig.label = "Tambah User";
      this.defineModel({
        postId: 9,
        id: 99,
        name: '',
        email: '',
        body: '',
      })
      this.loading = false;
    }else{
      this.buttonConfig.label = "Update User";
      this.getUser(this.userIdFromRoute)
    }
    
  }


  getUser(idUser:number) {
    this.loading = true;
    this.service.getUserAPI(idUser).subscribe(
      (data:ListUser) => {
        this.defineModel(data);
        this.loading = false;
      },
      (error:any) => {
        this.loading = false;
        this.toasterConfig.isShow = true;
        this.toasterConfig.icon = 'error';
        this.toasterConfig.message = 'Gagal Meload Data';
      }
    );
  }

  defineModel(data:ListUser){
    this.form = this.formBuilder.group({
      postId: [data.postId],
      id: [data.id],
      name: [data.name, Validators.required],
      email: [data.email, 
        [
          Validators.required,
          Validators.email
        ]
      ],
      body: [data.body, Validators.required],
    });
  }

  btnUpdate(){
    this.isBtnSave = false;
    this.service.updateUserAPI(this.form.value).subscribe(
      (data:ListUser) => {
        this.toasterConfig.isShow = true;
        this.toasterConfig.icon = 'warning';
        this.toasterConfig.message = 'Berhasil Update Data User';
        this.isBtnSave = true;
      },
      (error:any) => {
        this.isBtnSave = true;
        this.toasterConfig.isShow = true;
        this.toasterConfig.icon = 'error';
        this.toasterConfig.message = 'Gagal Update Data User';
      }
    );
  }

  btnCreate(){
    this.isBtnSave = false;
    const formCopy = Object.assign({}, this.form.getRawValue()); // copy form object
    delete formCopy.id; // delete property

    this.service.createUserAPI(formCopy).subscribe(
      (data:ListUser) => {
        this.toasterConfig.isShow = true;
        this.toasterConfig.icon = 'success';
        this.toasterConfig.message = 'Berhasil Tambah Data User';
        this.isBtnSave = true;
        this.btnBack();
      },
      (error:any) => {
        this.isBtnSave = true;
        this.toasterConfig.isShow = true;
        this.toasterConfig.icon = 'error';
        this.toasterConfig.message = 'Gagal Tambah Data User';
      }
    );
  }

  btnBack(){
    this.router.navigate(['/users']);
  }

}
