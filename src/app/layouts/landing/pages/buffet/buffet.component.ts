import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {WebcamImage, WebcamInitError, WebcamUtil} from "ngx-webcam";
import {HttpClient} from "@angular/common/http";
import {BACKEND} from "../../../../const";
import {Router} from "@angular/router";


@Component({
  selector: 'app-buffet',
  templateUrl: './buffet.component.html',
  styleUrls: ['./buffet.component.scss']
})
export class BuffetComponent implements OnInit, OnDestroy {
  // private webcamImage: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  snaps = [];
  public multipleWebcamsAvailable = false;
  showWebcam = false;
  public errors: WebcamInitError[] = [];
  start_text = 'شروع';
  capturing = false;
  captured = false;
  processing = false;
  DOOR_PIN = 7;
  users = [];

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

    this.closeDoor();

  }

  closeDoor() {
    console.log("door close");

  }

  openDoor() {

    console.log("door opens");
    setTimeout(() => {
      this.closeDoor();
    }, 5000);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // this.webcamImage = webcamImage;
    this.snaps.push(webcamImage);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public triggerSnapshot(): void {

    let count = 3;
    this.capturing = true;
    this.captured = false;
    this.snaps = [];
    this.showWebcam = true;

    const interval = setInterval(() => {

      this.trigger.next();
      count -= 1;
      this.start_text = count.toString();

      if (count === 0) {
        clearInterval(interval);
        this.capturing = false;
        this.start_text = 'در حال پردازش';
        this.captured = true;
        this.showWebcam = false;
        this.detect_faces();
      }
      this.changeDetectorRef.detectChanges();
    }, 500);

  }

  detect_faces() {
    const faces = [];
    this.processing = true;

    this.snaps.forEach(item => {
      faces.push(item.imageAsDataUrl);
    });
    this.http.post(BACKEND + 'api/face/detect', {faces: faces}).subscribe((res: any) => {
      this.users = res;
      this.processing = false;
      this.start_text = "دوباره";
    }, error => {
      this.processing = false;
      this.start_text = "دوباره";

    });
  }

  public handleInitError(error: WebcamInitError): void {
    console.log(error);
  }

  ngOnDestroy(): void {
    this.showWebcam = false;
  }

  continue(id, name) {
    this.router.navigate(['card', {id: id, name: name}]);
  }
}
