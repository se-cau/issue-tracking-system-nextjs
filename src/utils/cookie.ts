import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string) => {
    Cookies.set(name, value);
};

export const getCookie = (name: string): string | undefined => {
    return Cookies.get(name);
};
