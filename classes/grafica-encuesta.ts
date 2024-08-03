export class GraficaEncuestaData {

    private labels: string[] = [];
    private valores: number[] = [0, 0, 0, 0];

    constructor() { }

    setLabels( labels: string[] ) {
        this.labels = labels;
    }

    getDataGrafica() {
        return [
            { data: this.valores, label: 'Preguntas' }
        ];
    }


    incrementarValor( opcion: number, valor: number ) {

        this.valores[opcion] += valor;
        return this.getDataGrafica();

    }

}
