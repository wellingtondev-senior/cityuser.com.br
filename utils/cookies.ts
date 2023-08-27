import Cookies from 'js-cookie';
import cookie from 'cookie'


export function parseCookie(req:any):{} {
   if(!req || !req.headers){
    return {}
   }else{
    return cookie.parse(req.headers.cookie || "")
   }
}



export function setCookie(
    key:string, 
    value:string, 
    options?: Cookies.CookieAttributes):void{
     
        Cookies.set(key, value, {
            ...options,
           secure: process.env.NODE_ENV === 'production' ? true : false
        } )
}