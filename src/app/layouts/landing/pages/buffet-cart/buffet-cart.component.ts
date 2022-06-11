import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND} from "../../../../const";
import {DateConverterService} from "../../../../services/date-converter.service";
import {NbToastrService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {webSocket} from "rxjs/webSocket";

export enum STATES {
  WAITING,
  SHOPING,
  ASSIGNING,
}

@Component({
  selector: 'app-buffet-cart',
  templateUrl: './buffet-cart.component.html',
  styleUrls: ['./buffet-cart.component.scss']
})
export class BuffetCartComponent implements OnInit {
  lunches = [];
  BACKEND = BACKEND;

  tag_id = "";

  card = {};
  sending = false;
  user = {
    name: "",
    id: "",
    balance: 0,
  };
  error: any;

  state = STATES.WAITING;
  connected = false;
  ws: any;

  constructor(private http: HttpClient,
              private router: Router,
              public dateService: DateConverterService,
              private toastr: NbToastrService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.http.get(BACKEND + 'api/foods/buffet-items').subscribe((res: any) => {
      this.lunches = res;
    });

    this.resumeWS();
  }

  resumeWS() {
    this.ws = webSocket({url: 'wss://api.humanserver.ir/ws/buffet'});
    this.connected = true;
    this.ws.subscribe((data: any) => {
      this.tag_id = data.tag_id;
      if (this.tag_id !== undefined) {
        this.http.post(BACKEND + "api/tags/check", {tag_id: this.tag_id}).subscribe(res => {
          if (res['assigned']) {
            this.user = res['user'];
            this.state = STATES.SHOPING;
             this.http.get(BACKEND + 'api/foods/buffet-items').subscribe((res: any) => {
               this.lunches = res;
               this.cd.detectChanges();
            });
          } else {
            this.state = STATES.ASSIGNING;
            this.card = {};
          }
          this.pauseWS();
          this.cd.detectChanges();
        }, error => {
          this.pauseWS();
          this.reset();
          this.cd.detectChanges();
          this.connected = false;

        });
      }
    }, err => {
      this.error = err.message;
      this.connected = false;
      this.cd.detectChanges();

    }, () => {
      this.connected = false;
      this.cd.detectChanges();

    });

  }

  pauseWS() {
  }

  reset() {
    this.tag_id = "";
    this.state = STATES.WAITING;
    this.card = {};
    this.cd.detectChanges();
  }

  addCart() {
    if (Object.keys(this.card).length === 0) {
      this.toastr.warning("سبدت خالیه!", "چته!");
      return;
    }
    if (confirm("از خرید آیتم های انتخابی مطمئن هستید؟")) {
      this.sending = true;
      this.cd.detectChanges();

      this.http.post(BACKEND + 'api/foods/add-card', {user_id: this.user.id, card: this.card}).subscribe(res => {
        this.toastr.success("خرید شما ثبت شد!");
        this.card = {};
        this.state = STATES.WAITING;
        this.sending = false;
        this.cd.detectChanges();

      }, error => {
        // this.toastr.danger("خطایی رخ داد!");
        this.sending = false;
        this.cd.detectChanges();


      });
    }
  }

  add(id, name) {
    if (!Object.keys(this.card).includes(id)) {
      this.card[id] = {
        name: name,
        count: 0
      };
    }

    this.card[id].count += 1;
    this.cd.detectChanges();

  }


  reload() {
    window.location.reload();
  }
}
