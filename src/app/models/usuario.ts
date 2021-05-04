import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Observable } from "rxjs";
import { AngularFirestoreCollection } from "@angular/fire/firestore";

export class Usuario {
    
    public nombre: string;
    public email: string;
    public foto: string;
    public password: string;
   
    constructor(name: string, email: string, password: string, foto: string) {
        this.nombre = name;
        this.email = email;
        this.password = password;
        this.foto = foto;
        
    }

    async login(usuario: Usuario, router: Router, authSvc: AuthService, usuariosService: UsuariosService) {
        try {
            const user = await authSvc.login(usuario);
            if (user == null) {
                alert("email o password incorecto");
            } else {
                router.navigate(['/home']);
                authSvc.isLogged = true;
            }
        } catch (error) {
            alert(error);
        }
    }

    async register(usuario: Usuario, router: Router, authSvc: AuthService, usuariosService: UsuariosService) {
        try {
            const user = await authSvc.register(usuario).then(() => {
                router.navigate(['/home']);
                usuariosService.create({
                    "nombre": usuario.nombre,
                    "email": usuario.email,
                    "foto": usuario.foto
                }).then(() => {
                    console.log("mensaje enviado");

                });
            })
        } catch (error) {

        }
    }

    validarDatos(usuario: Usuario, validarRegistro: boolean): boolean {
        var respuesta: boolean = false;
        if (usuario.password != "" && usuario.email != "") {
            if (validarRegistro) {
                if (usuario.nombre != "") {
                    respuesta = true;
                }
                else {
                    alert("Por favor complete todos los campos");
                }
            }
            else {
                respuesta = true;
            }
        }
        else {
            alert("Por favor complete todos los campos");
        }
        return respuesta;
    }

    static ssss(usuariosService: any) {
        
    }
}
