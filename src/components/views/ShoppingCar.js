import React from 'react'
import Modal from 'emerald-ui/lib/Modal';
import { Button, IconButton, Table } from 'emerald-ui';
import Swal from "sweetalert2";

import ProductService from '../../services/ProductService';


const ShoppingCar = (props) => {
    const { refreshList, data, closeModal } = props;

    const subtractProduct = async(id) => {
        try {
            const data = {
                "productId": id,
            }
            const resp = await ProductService.deleteProductToCart(data);
            if(resp.status === 400){
                let obj = '';
                resp.data.errors.map( el => {
                    return obj += `${el.msg} <br/>`
                });
                
                Swal.fire({
                    title: 'Error!',
                    html: `${obj}`,
                    icon: 'error',
                    confirmButtonText: 'Accept'
                })
            }    
        } catch (error) {
            console.log(error);
        } finally {
                refreshList();
        }
    }

    return (
        <>
            <Modal.Header closeButton={false}>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ overflow: 'auto' }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quant.</th>
                                <th>SubTotal</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products && data.products.length > 0 && (
                                data.products.map((dataRes, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td>{dataRes.name}</td>
                                                <td>{dataRes.price}</td>
                                                <td>{dataRes.quantity}</td>
                                                <td>{dataRes.price * dataRes.quantity}</td>
                                                <td>
                                                    <IconButton
                                                        ariaLabel="Settings" 
                                                        color="info" 
                                                        icon="delete" 
                                                        title="Edit"
                                                        onClick={() => subtractProduct(dataRes.productId)} 
                                                        />
                                                </td>
                                            </tr>                                                
                                        </React.Fragment>
                                    );
                                })
                            )}
                            <tr>
                                <td colSpan={3}>Total Price</td>
                                <td colSpan={2}><b>{data.totalPrice}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal} color="info">
                    Hidden
                </Button>
            </Modal.Footer>
        </>
    )
}

export default ShoppingCar;
