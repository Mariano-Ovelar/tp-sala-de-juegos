export class Mensaje {
    nombre: string = '';
    texto: string = '';
    email: string = '';
    hora: string = '';
    fecha: string = '';
    constructor(texto: string) {
        this.texto = texto;
        this.hora = new Date().toLocaleTimeString();
        this.fecha = new Date().toLocaleDateString();
        this.email = "";
        this.nombre = "";
    }
}
