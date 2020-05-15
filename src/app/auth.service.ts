import * as firebase from 'firebase';

export class AuthService{
    singupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        )
    }
}