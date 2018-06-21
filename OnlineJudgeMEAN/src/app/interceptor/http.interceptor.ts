import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { _throw } from "rxjs/observable/throw";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { ResponseResult, AlertMessage, AlertMessageList } from "./../models";
import { AlertService } from "./../services/";

/**
 * Intercepts the HTTP responses, and in case that an error/exception is thrown, handles it
 * and extract the relevant information of it.
 */
@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}
  messages: AlertMessageList = new Array();

  /**
     * Intercepts an outgoing HTTP request, executes it and handles any error that could be triggered in execution.
     * @see HttpInterceptor
     * @param request the outgoing HTTP request
     * @param next a HTTP request handler
     */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add a custom header
    const customReq = request.clone({
      //headers: request.headers.set('Content-Type', 'application/json')
    });
    //return next.handle(request);
    return next
      .handle(customReq)
      .do((ev: HttpEvent<any>) => {
        //console.log(customReq);
        if (ev instanceof HttpResponse) {
          //console.error(ev);
          //console.log('processing response', ev);
        }
      })
      .catch(response => {
        let respResult = new ResponseResult(200, "");
        //console.error(response);
        if (response instanceof HttpErrorResponse) {
          if (response.status == 422) {
            //console.log("422");
            // 422 error is returned by express-validator
            var errors = response.error.errors;
            console.log("raw error:");
            console.log(errors);

            for (var i = 0; i < errors.length; i++) {
              let am = new AlertMessage("error", errors[i].msg);
              this.messages[i] = am;
            }
            console.log("alert messages:");
            console.log(this.messages);
            this.alertService.error(this.messages);
          } else {
            // validation error
            console.log("HttpErrorResponse:" + response.status);
            const err = response.message || JSON.stringify(response.error);
            respResult.status = response.status;
            respResult.message = `${response.statusText || ""} Details: ${err}`;
            this.alertService.error(response.message);
          }
        } else {
          respResult.status = 400;
          respResult.message = response.message
            ? response.message
            : response.toString();
          this.alertService.error(response.message);
        }
        //console.error(respResult.message);
        // return _throw(respResult);
        return next.handle(request);
      });
  }
}

/**
 * Provider POJO for the interceptor
 */
export const ErrorInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHttpInterceptor,
  multi: true
};
