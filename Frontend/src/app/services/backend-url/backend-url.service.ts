import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendUrlService {
  //private IP: string = '52.200.8.203';
  private IP: string = '127.0.0.1';
  private PORT: number = 8000;
  private backendUrl: string = 'http://'+ this.IP + ':' + this.PORT + '/webshop/';

  getBackendUrl(): string {
    return this.backendUrl;
  }
}
