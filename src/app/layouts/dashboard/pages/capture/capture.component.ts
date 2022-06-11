import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from "ngx-webcam";
import {Observable, Subject} from "rxjs";
import {start} from "repl";
import {HttpClient} from "@angular/common/http";
import {BACKEND} from "../../../../const";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit, OnDestroy {
  // private webcamImage: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  snaps = [];
  public multipleWebcamsAvailable = false;
  showWebcam = false;
  public errors: WebcamInitError[] = [];
  start_text = 'شروع';
  capturing = false;
  captured = false;
  uploading = false;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private http: HttpClient,
              private toastr: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.showWebcam = true;
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public handleImage(webcamImage: WebcamImage): void {
    // this.webcamImage = webcamImage;
    this.snaps.push(webcamImage);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public triggerSnapshot(): void {


    let count = 10;
    this.capturing = true;
    this.captured = false;
    this.snaps = [];

    const interval = setInterval(() => {

      this.trigger.next();
      count -= 1;
      this.start_text = count.toString();

      if (count === 0) {
        clearInterval(interval);
        this.capturing = false;
        this.start_text = 'دوباره';
        this.captured = true;
      }
      this.changeDetectorRef.detectChanges();
    }, 500);

  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  upload() {
    const faces = [];
    this.uploading = true;
    this.capturing = true;
    this.snaps.forEach(item => {
      faces.push(item.imageAsDataUrl);
    });
    this.http.post(BACKEND + 'api/face/face', {faces: faces}).subscribe(res => {
      this.uploading = false;
      this.capturing = false;
      this.showWebcam = false;
      this.toastr.success("اطلاعات شما با موفقیت آپلود و پردازش شد.",
        'موفق', {position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.router.navigate(["/dashboard"]);

    }, err => {
      this.uploading = false;
            this.capturing = false;
    });
  }

  ngOnDestroy(): void {
    this.showWebcam = false;
  }
}
