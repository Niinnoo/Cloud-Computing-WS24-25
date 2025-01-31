import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendUrlService {
  private IP: string = 'localhost';
  private PORT: number = 8080;
  private backendUrl: string = 'http://'+ this.IP + ':' + this.PORT + '/webshop/';

  getBackendUrl(): string {
    return this.backendUrl;
  }
}
