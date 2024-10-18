const accessToken = "notenest.acc.tk";
const refreshToken = "noteest.ref.tk";

class TokenStore {
  static getAccessToken() {
    return localStorage.getItem(accessToken);
  }

  static setAccessToken(token: string) {
    localStorage.setItem(accessToken, token);
  }

  static removeAccessToken(): void {
    localStorage.removeItem(accessToken);
  }

  static getRefreshToken() {
    return localStorage.getItem(refreshToken);
  }

  static setRefreshToken(token: string) {
    localStorage.setItem(refreshToken, token);
  }

  static removeRefreshToken(): void {
    localStorage.removeItem(refreshToken);
  }
}

export default TokenStore;
