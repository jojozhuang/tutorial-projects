import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/**
 * Intercepts the HTTP responses, and in case that an error/exception is thrown, handles it
 * and extract the relevant information of it.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    /**
     * Intercepts an outgoing HTTP request, executes it and handles any error that could be triggered in execution.
     * @see HttpInterceptor
     * @param request the outgoing HTTP request
     * @param next a HTTP request handler
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add a custom header
        const customReq = request.clone({
            //headers: request.headers.set('Content-Type', 'application/json')
        });
        //return next.handle(request);
        return next.handle(customReq)
            .do((ev: HttpEvent<any>) => {
                console.log(customReq);
                if (ev instanceof HttpResponse) {
                    //console.log('processing response', ev);
                }
            })
            .catch(response => {
                let errMsg: string;
                if (response instanceof HttpErrorResponse) {
                    const err = response.message || JSON.stringify(response.error);
                    errMsg = `${response.status} - ${response.statusText || ''} Details: ${err}`;
                } else {
                    errMsg = response.message ? response.message : response.toString();
                }
                console.error(errMsg);
                //return _throw(errMsg);
                return Observable.throw(response);
            });
    }
}

/**
 * Provider POJO for the interceptor
 */
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};