import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ResponseResult } from './models';

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
                /*if (ev instanceof HttpResponse) {
                    //console.error(ev);
                    //console.log('processing response', ev);
                }*/
            })
            .catch(response => {
                let respResult = new ResponseResult(200, "");
                console.error(response);
                if (response instanceof HttpErrorResponse) {
                    const err = response.message || JSON.stringify(response.error);
                    respResult.statusCode = response.status;
                    respResult.message = `${response.statusText || ''} Details: ${err}`;
                } else {
                    respResult.statusCode = 400
                    respResult.message = response.message ? response.message : response.toString();
                }
                console.error(respResult.message);
                return _throw(respResult);
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