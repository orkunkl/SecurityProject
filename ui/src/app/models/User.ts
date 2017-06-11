export class User {
    userID: number;
    username: String;
    email: String;
    surname: String;
   	isAdmin: Boolean;

   	constructor(userID: number, username: String, email: String, surname: String, isAdmin: Boolean){
   		this.userID = userID;
   		this.username = username;
   		this.email = email;
   		this.surname = surname;
   		this.isAdmin = isAdmin;
   	}
}