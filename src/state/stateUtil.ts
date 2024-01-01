import { AtomEffect } from "recoil";

export const localStorageEffect: (key: string) => AtomEffect<any> = (key: string) => ({ setSelf, onSet }) => {
    if (typeof window == 'undefined') {
        return
    }
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};