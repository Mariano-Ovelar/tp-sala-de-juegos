export class Usuario {

    public userName: string;
    public password: string;
    public email: string;

    constructor(password: string, email: string, userName: string) {
        this.userName = userName;
        this.password = password;
        this.email = email;
    }

    login(usuario: Usuario) {

    }

    register(usuario: Usuario) {

    }


}
