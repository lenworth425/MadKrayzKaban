import { JwtPayload, jwtDecode } from 'jwt-decode';

interface UserPayload extends JwtPayload {
  id: number;
  username: string;
  exp: number;
}

class AuthService {
  getProfile(): UserPayload | null {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<UserPayload>(token): null;
  }

  loggedIn(): boolean {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    // if (!token) {
    //   return false;
    // }
    return !!token && !this.isTokenExpired(token);

  }
  
  isTokenExpired(token: string): boolean {
    // TODO: return a value that indicates if the token is expired
   try {
      const decoded = jwtDecode<UserPayload>(token);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        console.log('Token expired');
        this.logout();
        return true;
      }
      return false;
    } catch (err) {
      console.log('Error decoding token:', err);
      return true;
    }
  }

  getToken(): string | null {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';  
    return loggedUser;
  }
  

  login(idToken: string): void {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout(): void {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
