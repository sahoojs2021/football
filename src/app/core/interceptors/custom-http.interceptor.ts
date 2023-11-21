import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

interface MyRequestType {
  // Define the structure of request data here
}

interface MyResponseType {
  // Define the structure of response data here
}

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<MyRequestType>,
    next: HttpHandler
  ): Observable<HttpEvent<MyResponseType>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'x-rapidapi-host': environment.apiHost,
        'x-rapidapi-key': environment.apiKey
      },
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors here
        console.error('HTTP error occurred:', error);

        // Show toast notification with the error message
        this.toastr.error('An error occurred. Please try again later.');

        // Optionally, rethrow the error to propagate it to the subscriber
        return throwError(error);
      })
    );
  }
}
