import { Injectable } from '@angular/core';

import firebase from 'firebase/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})

export class SessionManager {

    //agrego constructor
    constructor(public fireAuth: AngularFireAuth) { }


    private readonly temporaryEmail: string = 'em';
    private readonly temporaryPass: string = 'pass';

    performLogin(email: string, password: string): boolean {
        if(email == this.temporaryEmail && password == this.temporaryPass) {
            return true;
        } else {
            return false;
        }  
    }

    async signOut() {
        return await this.fireAuth.signOut()
    }

    async registerUserWith(email: string, password: string) : Promise<any> {
        return await this.fireAuth.createUserWithEmailAndPassword(email, password)
    }

    async loginWith(email: string, password: string) : Promise<any> {
        return await this.fireAuth.signInWithEmailAndPassword(email, password)
    }

    async resetPassword(email: string) {
        return await this.fireAuth.sendPasswordResetEmail(email)
    }

    async getProfile() {
        return await this.fireAuth.currentUser
    }
}