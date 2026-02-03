import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class Encryption {
    private key = environment.encryptionKey;

    constructor() {}

    setItem(key: string, data: any): void {
        try {
            const dataString = JSON.stringify(data);
            const encryptedData = CryptoJS.AES.encrypt(
                dataString,
                this.key
            ).toString();

            localStorage.setItem(key, encryptedData);
        } catch (error) {
            console.error('Error encrypting and saving data:', error);
        }
    }

    getItem(key: string): any {
        try {
            const encrypedData = localStorage.getItem(key);

            if (!encrypedData)
                return null;

            const decryptedBytes = CryptoJS.AES.decrypt(encrypedData, this.key);
            const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);

            return JSON.parse(decryptedString);
        } catch (error) {
            console.error('Error decrypting data:', error);
            return null;
        }
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
