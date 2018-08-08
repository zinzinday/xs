import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {ApiResponse} from "../../interface/api-response";
import {AlertController, LoadingController, ToastController} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {City} from "../../interface/city";
import {Award} from "../../interface/award";
import {AuthProvider} from "../auth/auth";
import "rxjs/add/operator/mergeMap";
import {Region} from "../../interface/region";
import {TicketType} from "../../interface/ticket-type";


@Injectable()
export class RestProvider {

  constructor(private http: HttpClient,
              private alert: AlertController,
              private toast: ToastController,
              private loading: LoadingController,
              private auth: AuthProvider) {
    console.log('Hello RestProvider Provider');
  }

  private url(uri: string, params?: any) {
    params = params ? '?' + this.nestParams(params) : '';
    return 'https://api.xs.hn/' + uri + params;
  }

  private nestParams(obj, prefix?: string) {
    let str = [], p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + "[" + p + "]" : p;
        let v = obj[p];
        str.push((v !== null && typeof v === "object") ? this.nestParams(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

  public setErrors(form: FormGroup, errors: [{ field: string; group?: string; message: string }]) {
    console.log(errors);
    for (let error of errors) {
      let control: AbstractControl;
      if (error.group) {
        control = form.get(error.group).get(error.field);
      } else {
        control = form.get(error.field);
      }
      if (control instanceof AbstractControl) {
        control.setErrors({api: error.message});
      }
    }
  }

  public showAlert(title: string, message: string) {
    this.alert.create({
      title: title,
      message: message,
    }).present().catch();
  }

  public showToast(message, closeText?) {
    this.toast.create({
      duration: 3000,
      message: message,
      showCloseButton: !!closeText,
      closeButtonText: closeText
    }).present().catch();
  }

  public createLoading(content?: string, options: any = {}) {
    if (content) {
      options = (<any>Object).assign(options, {content: content});
    }
    return this.loading.create(options)
  }

  lookup(data: any) {
    return this.http.post(this.url('user/lookup'), data).pipe().map((res: ApiResponse) => res);
  }

  login(data: any) {
    return this.http.post(this.url('user/authorize'), data).pipe().map((res: ApiResponse) => res);
  }

  register(data: any): Observable<ApiResponse> {
    return this.http.post(this.url('user'), data).pipe().map((res: ApiResponse) => res);
  }

  private getWithAuth(url, options: any = {}): Observable<any> {
    return this.auth.credential.pipe().mergeMap(res => {
      let httpOptions = (<any>Object).assign(options, {
        headers: {
          Authorization: res.type + ' ' + res.access_token
        }
      });
      return this.http.get(url, httpOptions);
    }).pipe().map((res: any) => {
      if (res.success) {
        return res.data;
      } else {
        return [];
      }
    });
  }

  private postWithAuth(url, data?: any, options: any = {}): Observable<ApiResponse> {
    return this.auth.credential.pipe().mergeMap(res => {
      let httpOptions = (<any>Object).assign(options, {
        headers: {
          Authorization: res.type + ' ' + res.access_token
        }
      });
      return this.http.post(url, data, httpOptions);
    }).pipe().map((res: any) => res);
  }

  listCities(params?: any): Observable<City[]> {
    return this.getWithAuth(this.url('city', params)).pipe().map((res: City[]) => res);
  }

  listRegions(params?: any) {
    return this.getWithAuth(this.url('region', params)).pipe().map((res: Region[]) => res);
  }

  result(params): Observable<Award[]> {
    return this.getWithAuth(this.url('result', params)).pipe().map((res: Award[]) => res);
  }

  listTypes(params?: any): Observable<TicketType[]> {
    return this.getWithAuth(this.url('type', params)).pipe().map((res: TicketType[]) => res);
  }

  createType(data: any) {
    return this.http.post(this.url('type'), data);
  }

  updateType(typeId: string, data: any) {
    return this.http.put(this.url('type/' + typeId), data);
  }

  deleteType(typeId: string) {
    return this.http.delete(this.url('type/' + typeId));
  }

  createTicket(data: any): Observable<ApiResponse> {
    return this.http.post(this.url('ticket'), data).pipe().map((res: ApiResponse) => res);
  }

  requestPhone(data: any): Observable<ApiResponse> {
    return this.postWithAuth(this.url('user/phone/request'), data);
  }

  confirmPhone(data: any) {
    return this.postWithAuth(this.url('user/phone/verify'), data);
  }

  authyVerify(data: any) {
    return this.postWithAuth(this.url('user/authy/verify'), data);
  }

  authRegister() {
    return this.postWithAuth(this.url('user/authy/register'));
  }
}
