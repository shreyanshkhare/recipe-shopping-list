import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // return next.handle(req);
        if (['/recipe/login/', '/recipe/user/'].includes(req.url)) {
            return next.handle(req);
        }

        const token = JSON.parse(localStorage.getItem('userData') || '{}').access_token
        const modifyReq = req.clone({
            setHeaders: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Authorization': "JWT " + token
            }
        })
        return next.handle(modifyReq);
    }
}