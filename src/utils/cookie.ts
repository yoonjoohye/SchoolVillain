import Cookies from 'js-cookie';

export function setCookie(name: string, value: string, option: object) {
    return Cookies.set(name, value, option);
}

export function getCookie(name: string) {
    return Cookies.get(name);
}

export function removeCookie(name: string) {
    return Cookies.remove(name);
}
