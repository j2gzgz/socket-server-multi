
export class GraficaData {
    private meses: string[] = ['enero', 'febrero', 'marzo', 'abril'];
    private valores: number[]  = [0,0,0,0];

    constructor() {}

    getDataGrafica() {
        return [
            {
                data: this.valores,
                label: 'Ventas',
                // backgroundColor: 'rgba(148,159,177,0.2)',
                // borderColor: 'rgba(148,159,177,1)',
                // pointBackgroundColor: 'rgba(148,159,177,1)',
                // pointBorderColor: '#fff',
                // pointHoverBackgroundColor: '#fff',
                // pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                // fill: 'origin',
            },
 
        ]
    }

    incrementarValor(mes: string, valor: number) {

        mes = mes.toLowerCase().trim();

        for (let i in this.meses) {
            if(this.meses[i] === mes) {
                this.valores[i] += valor
            }
            
        }

        return this.getDataGrafica();

    }

}