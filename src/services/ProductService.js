/**
 * File with get services of products
  * @author Mauricio Moreno maomaoq@hotmail.com
 */

 import axiosInstance from '../config/AxiosConfig';
 //import { useQuery } from "react-query";

 class ProcessService {
 
     /**
      * Get list of the products
      * @author Mauricio Moreno maomaoq@hotmail.com
      */
     async createProducts(data) {
        
        return axiosInstance.post(`products`, data)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              if( error.response.data.errors){
                  return error.response
              }
            }
          });
    }
    
     /**
      * Create a new product
      * @param {*} data
      * @author Mauricio Moreno maomaoq@hotmail.com
      */
      async editProducts(data) {
        return axiosInstance.patch(`products`, data)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              if( error.response.data.errors){
                  return error.response
              }
            }
          });
    }

    /**
      * Insert a new product in the cart
      * @param {*} data
      * @author Mauricio Moreno maomaoq@hotmail.com
      */
      async addProductToCart(data) {
        return axiosInstance.patch(`shopping`, data)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              if( error.response.data.errors){
                  return error.response
              }
            }
          });
    }

    /**
      * Delete a product in the cart
      * @param {*} data
      * @author Mauricio Moreno maomaoq@hotmail.com
      */
      async deleteProductToCart(data) {
        return axiosInstance.delete(`shopping`, {data} )
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              if( error.response.data.errors){
                  return error.response
              }
            }
          });
    }

    /**
      * List products in the cart
      * @param {*} data
      * @author Mauricio Moreno maomaoq@hotmail.com
      */
      async listProductsCart() {
        return axiosInstance.get(`shopping`)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              if( error.response.data.errors){
                  return error.response
              }
            }
          });
    }
 
 }
 
 export default new ProcessService();
 