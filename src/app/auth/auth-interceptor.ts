import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (['/api/login/', '/api/user/'].includes(req.url)) {
            return next.handle(req);
        }

        const access = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTEwNjY2MDYsImlhdCI6MTYxMTA2NDgwNiwibmJmIjoxNjExMDY0ODA2LCJpZGVudGl0eSI6MX0.hlCfOHuk8djt1q-TVKUqv9x-UOar0BRLnc3mWQYK85Y"

        const {token = access} = JSON.parse(localStorage.getItem('userData') || '{}')
        const modifyReq = req.clone({headers: req.headers.append("Authorization", `Token ${token}`)})
        return next.handle(modifyReq);
    }
}