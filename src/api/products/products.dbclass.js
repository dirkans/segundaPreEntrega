import mongoose from 'mongoose';
import productModel from './products.model.js';

class Products {
    constructor() {
        this.status = 0;
        this.statusMsg = "inicializado";
    }

    checkStatus = () => {
        return this.status;
    }

    showStatusMsg = () => {
        return this.statusMsg;
    }


    getProducts = async (req) => {
        try {
        
        let queryModel = {};
        let optionsModel = {};

        //Verificamos si hay query y value, de ser así devuelve solo los productos que cumplen con el filtro deseado
            if(req.query&&req.value){
                const {query,value} = req;
                queryModel[query] = value;}
            
            // Verifica si se pasó sort como queryparam, y si es H,h o Higher aplica filtro desenciente, y si es l,L
            // o lower aplica filtro ascendente.
            if(req.sort&&req.sort=="h"||req.sort=="H"||req.sort=="higher"){
                optionsModel.sort = {price: -1};
            } else if (req.sort&&req.sort=="l"||req.sort=="L"||req.sort=="lower"){
                optionsModel.sort = {price: 1}
            }
            //Verifica si se pasó limit como queryparam, y de ser así lo agrega al objeto modelo que se pasa como parámetro en el paginate
            if(req.limit){
                optionsModel.limit = req.limit;
            }
            //Igual que el anterior pero verifica si se pasó pagina deseada
            if(req.page){
                optionsModel.page = req.page;
            }
            
            const products = await productModel.paginate(queryModel,optionsModel)
            this.status = 1;
            this.statusMsg = 'Productos recuperados';
            return products;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getProducts: ${err}`;
        }
    }





    
}

export default Products;