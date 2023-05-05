import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private accessToken: string;
  private refreshToken: string;

  constructor() {}

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  setRefreshToken(token: string): void {
    this.refreshToken = token;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }
}