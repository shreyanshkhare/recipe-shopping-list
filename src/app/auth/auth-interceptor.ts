import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import {environment} from 'src/environments/environment'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // return next.handle(req);
        let baseUrl = environment.appBaseUrl+req.url        
        if (['/recipe/login/', '/recipe/user/'].includes(req.url)) {
            return next.handle(req.clone({
                url:baseUrl,
            }));
        }

        const token = JSON.parse(localStorage.getItem('userData') || '{}').access_token
        const modifyReq = req.clone({
            url:baseUrl,
            setHeaders: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Authorization': "JWT " + token
            }
        })
        return next.handle(modifyReq);
    }
}