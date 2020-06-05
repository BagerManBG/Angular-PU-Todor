import {HttpClient} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {UserInterface} from '../interfaces/user.interface';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  public currentUserData = this.getCurrentUser();

  constructor(private http: HttpClient, private router: Router) { }

  edit(user: UserInterface): void {
    this.http.patch(`${this.baseUrl}/users/${user.id}`, user)
      .subscribe(() => {
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        this.currentUserData = this.getCurrentUser();
        this.router.navigateByUrl('courses/list');
      });
  }

  register(user: UserInterface): Observable<UserInterface> {
    return new Observable((observer) => {
      this.http.post(`${this.baseUrl}/users`, user)
        .subscribe(() => {
          observer.complete();
        });
    });
  }

  login(email: string, password: string): Observable<UserInterface> {
    return new Observable((observer) => {
      this.getAllUsers()
        .subscribe((allUsers) => {
          const user = allUsers
            .find(u => u.email === email && u.password === password);

          if (user) {
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            this.currentUserData = user;
            window.location.href = '/courses/list';

            observer.next(user);
            observer.complete();
          } else {
            observer.error('Incorrect username/password!');
          }
        });
    });
  }

  logout(): void {
    sessionStorage.removeItem('loggedUser');
    this.currentUserData = null;
    this.router.navigateByUrl('auth/login');
  }

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>('http://localhost:3000/users');
  }

  getCurrentUser(): UserInterface {
    return JSON.parse(sessionStorage.getItem('loggedUser'));
  }

  isAdmin(): boolean {
    return Boolean(this.currentUserData?.isAdmin);
  }

  isLogged(): boolean {
    return Boolean(this.currentUserData);
  }

  getCurrentUserNames(): string {
    return this.isLogged() ? `${this.currentUserData.firstName} ${this.currentUserData.lastName}` : '';
  }
}
