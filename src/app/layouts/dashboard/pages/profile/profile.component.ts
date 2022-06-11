import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../../core/data/user/user.service";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {RadialColorPickerComponent} from "../../../components/color-picker/components/radial-color-picker/radial-color-picker.component";
import {color} from "d3-color";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('color_picker') color_picker: RadialColorPickerComponent;


  user = {
    first_name: "",
    last_name: "",
    username: "",
    balance: 0,
    color: ""

  };
  loading = false;

  constructor(private http: HttpClient, private userService: UserService,
              private toastr: NbToastrService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.userService.getUserProfile().then((res: any) => {
      this.user = res;
    });
  }

  save() {
    this.loading = true;
    this.userService.updateProfile(this.user).then(res => {
      this.toastr.success("پروفابل شما آپدیت شد!", 'موفق', {position: NbGlobalPhysicalPosition.TOP_RIGHT});
    }).finally(() => {
      this.loading = false;
    });
  }

  colorChaged(event) {
    console.log(event);
  }
}
