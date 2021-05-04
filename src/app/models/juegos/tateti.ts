export class Tateti {
    public tablero: any;
    public fichaHumano: any;
    public fichaComputadora: any;
    public turno: any;
    public jugados: any;
    constructor(fichaH: string, turno: string) {
        this.tablero = [
            [{ ocupada: false, ficha: "", posicion: [0, 0] }, { ocupada: false, ficha: "", posicion: [0, 1] }, { ocupada: false, ficha: "", posicion: [0, 2] }],
            [{ ocupada: false, ficha: "", posicion: [1, 0] }, { ocupada: false, ficha: "", posicion: [1, 1] }, { ocupada: false, ficha: "", posicion: [1, 2] }],
            [{ ocupada: false, ficha: "", posicion: [2, 0] }, { ocupada: false, ficha: "", posicion: [2, 1] }, { ocupada: false, ficha: "", posicion: [2, 2] }]];
        this.fichaHumano = fichaH;
        this.fichaComputadora = (fichaH == 'X') ? 'O' : 'X';
        this.turno = turno, //h humano, c computadora
            this.jugados = 0;
    }

    //métodos
    setFichaHumano(ficha: any) {
        this.fichaHumano = ficha;
        this.fichaComputadora = (ficha == 'X') ? 'O' : 'X';
    }

    reset(fichaH: any, turno: any) {
        this.tablero = [
            [{ ocupada: false, ficha: "", posicion: [0, 0] }, { ocupada: false, ficha: "", posicion: [0, 1] }, { ocupada: false, ficha: "", posicion: [0, 2] }],
            [{ ocupada: false, ficha: "", posicion: [1, 0] }, { ocupada: false, ficha: "", posicion: [1, 1] }, { ocupada: false, ficha: "", posicion: [1, 2] }],
            [{ ocupada: false, ficha: "", posicion: [2, 0] }, { ocupada: false, ficha: "", posicion: [2, 1] }, { ocupada: false, ficha: "", posicion: [2, 2] }]];
        this.fichaHumano = fichaH;
        this.fichaComputadora = (fichaH == 'X') ? 'O' : 'X';
        this.turno = turno;
        this.jugados = 0;
    }

    agregarFicha(tipoFicha: any, fila: any, columna: any) {
        this.tablero[fila][columna].ocupada = true;
        this.tablero[fila][columna].ficha = tipoFicha;
        
    }

    estaOcupada(fila: any, columna: any) {
        return this.tablero[fila][columna].ocupada;
    }

    cambiarTurno() {
        if (this.turno == 'c') {
            this.turno = 'h';
        } else {
            this.turno = 'c';
        }
    }

    mostrarTablero() {
        console.log("------------------");
        for (var i = 0; i < this.tablero.length; i++) {
            var f = this.tablero[i];
            var c1 = f[0].ficha;
            var c2 = f[1].ficha;
            var c3 = f[2].ficha;
            var txt = "|  " + c1 + "  |  " + c2 + "  |  " + c3 + "  |";
            console.log(txt);
        }
        console.log("------------------");
    }

    diagonales() {
        var res: any = [];
        res.push([]);
        res.push([]);
        res[0].push(this.tablero[0][0]);
        res[0].push(this.tablero[1][1]);
        res[0].push(this.tablero[2][2]);
        res[1].push(this.tablero[0][2]);
        res[1].push(this.tablero[1][1]);
        res[1].push(this.tablero[2][0]);
        return res;
    }

    columna(n: any) {
        var res = [];
        for (var f of this.tablero) {
            res.push(f[n]);
        }
        return res;
    }

    columnas() {
        var res = [];
        res.push(this.columna(0));
        res.push(this.columna(1));
        res.push(this.columna(2));
        return res;
    }

    estaTerminado() {
        //si para toda fila y toda columna y toda diagonal no hay tres fichas iguales o queda alguna celda vacía entonces no está terminado
        //chequear si están todas las celdas ocupadas, en ese caso 	devolver true, está terminado
        //si no están todas ocupadas, chequear si hay tres en línea 	en filas, columnas y diagonales
         return this.estaLleno() || this.hay3EnLinea(); 
    }

    estaLleno() {
        return this.jugados >= 9;
    }

    hay3EnLinea() {
        var lineas = this.columnas().concat(this.tablero).concat(this.diagonales());
        for (var linea of lineas) {
            if (this.hay3Iguales(linea)) {
                return true;
            }
        }
        return false;
    }

    //devuelve una lista de posiciones de celdas vacías que están en líneas con dos celdas ocupadas
    celdasVaciasDeLineasConDosOcupadas(ficha: any) {
        var lineas = this.columnas().concat(this.tablero).concat(this.diagonales());
        var res = [];
        for (var linea of lineas) {
            var tiene = this.tieneUnaSolaDesocupada(linea, ficha); //espero un array vacío o uno no vacío con dos elementos correspondientes a una posición de celda del tablero
            if (tiene.length !== 0) {
                res.push(tiene);
            }
        }
        return res;
    }

    tieneUnaSolaDesocupada(linea: any, tipoFicha: any) {
        //revisar y reescribir
        var count = 0;
        var posicion = [];
        for (var celda of linea) {
            if (celda.ocupada) {
                if (celda.ficha === tipoFicha) {
                    count++;
                }
            } else {
                //guardar la celda desocupada
                posicion = celda.posicion;
            }
        }
        if (count === 2) {
            return posicion;
        } else {
            return [];
        }
    }

    hay3Iguales(linea: any) {
        //revisar y reescribir para mejor legibilidad
        var count = 0;
        var ficha = "";
        for (var celda of linea) {
            if (celda.ocupada) {
                if (ficha !== "") {
                    if (ficha === celda.ficha) {
                        count++;
                    } else {
                        return false;
                    }
                } else {
                    ficha = celda.ficha;
                    count++;
                }
            } else {
                return false;
            }
        }
        return count === 3;
    }

    desocupada() {
        //busca y devuelve una celda desocupada
        var posicion = [];//un par ordenado de fila, columna
        for (var i = 0; i < this.tablero.length; i++) {
            var f = this.tablero[i];
            for (var j = 0; j < f.length; j++) {
                if (!this.estaOcupada(i, j)) {
                    posicion = [i, j];
                    return posicion; //devuelve la primera que encuentra
                }
            }
        }
        return [-1, -1];
    }
}
