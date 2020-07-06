Vue.component('modal', {
    template: '#modal-template',
    data(){
        return{
            algo: 0,
            color: false,
        }
    },
    props:['presupuestoaux'],
    methods:{
        guardarAlgo:function(){
            //localStorage.setItem('super-app-presupuesto', valor);
            //this.$emit('nuevopresupuesto', this.reasignacion)
            this.$emit('nuevopresupuesto', this.algo);
            localStorage.setItem('super-app-presupuesto', this.algo);            
            this.color = true;
        },
    },
    mounted() {
        return this.algo = this.presupuestoaux; //ya iguale el valor de algo con el presupuesto que manda el padre, ahora lo que quiero es que se guarde en el local storage y que con el emit se actualice el valor de 'presupuesto en el componente'
    },
  })

var app = new Vue({
    el: '#app',
    data() {
        return {
            message: 'Super App',
            compras: [],
            nuevaCompraName: '',
            nuevaCompraAmount: 0,
            nuevaCompraPrice: 0,
            presupuesto: 0,
            totalGastado: 0,
            showModal: false,
            algo:3,
            alturaTotal: 0,

        }
    },
    mounted(){
        this.alturaTotal = this.$refs.titleTamano1.clientHeight +  this.$refs.inputsTamano1.clientHeight;
        
    },
    methods: {
        nuevaCompra : function(){
            this.compras.push({
                nombre: this.nuevaCompraName,
                cantidad: this.nuevaCompraAmount,
                precio: this.nuevaCompraPrice
            });
            this.nuevaCompraName = '';
            this.nuevaCompraAmount= 0;
            this.nuevaCompraPrice = 0;
            localStorage.setItem('super-app-compras', JSON.stringify(this.compras));
        },
        deleteCompra:function(index){
            this.compras.splice(index,1);
            //this.totalGastado = this.total_gastado_func;
            localStorage.setItem('super-app-compras', JSON.stringify(this.compras));
        },
        editCompra: function(index, name, amount, price){
            this.nuevaCompraName = name,
            this.nuevaCompraAmount = amount,
            this.nuevaCompraPrice = price,
            this.deleteCompra(index);
            localStorage.setItem('super-app-compras', JSON.stringify(this.compras));
        }
    },
    created: function() {
        let datosComprasDB = JSON.parse(localStorage.getItem('super-app-compras'));
        let datoPresupuestoDB = JSON.parse(localStorage.getItem('super-app-presupuesto'));
        if(datosComprasDB === null){
            this.compras = [];
        }
        else{
            this.compras = datosComprasDB;
        }
        if(datoPresupuestoDB === null){
            this.presupuesto = 1000
            localStorage.setItem('super-app-presupuesto', 1000);
        }
        else{
            this.presupuesto = datoPresupuestoDB
        }
//        datoPresupuestoDB === null ? this.presupuesto = 1000 : this.presupuesto = datoPresupuestoDB;
        
    },
    computed: {
        total_gastado_func(){
            this.totalGastado = 0;
            this.compras.forEach(element => {
                this.totalGastado += element.cantidad * element.precio;
            });
            return this.totalGastado;
        },
        colorearBG(){
            let colorBG ='';
            if(this.total_gastado_func <= (this.presupuesto * .33)){
                colorBG = 'bg-success'
                console.log("entro en bg-success: "+colorBG);
            }
            else if(this.total_gastado_func <= (this.presupuesto * .66)){
                colorBG = 'bg-warning'
                console.log("entro en bg-warning: "+colorBG);
            }
            else if(this.total_gastado_func <= (this.presupuesto * 1)){
                colorBG = 'bg-danger'
                console.log("entro en bg-danger: "+colorBG);
            }
            else{
                console.log("entro en bg-dark: "+colorBG);
                colorBG = 'bg-dark'
            }
            return colorBG;
        }
    },
});