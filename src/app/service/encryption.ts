import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class Encryption {
    private key = environment.encryptionKey;

    constructor() {}

    encrypt(key: string, data: any): string {
        const dataString = JSON.stringify(data);
        return CryptoJS.AES.encrypt(
            dataString,
            this.key
        ).toString();
    }

    decrypt(encryptedData: string): any {
        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, this.key);
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
