import React, { useEffect } from 'react'

import Modal from 'emerald-ui/lib/Modal';
import { Button } from 'emerald-ui';
import TextField from 'emerald-ui/lib/TextField';
import SingleSelect from 'emerald-ui/lib/SingleSelect';

import { useForm, Controller } from 'react-hook-form';
import Swal from "sweetalert2";

import ProductService from '../../services/ProductService';

const CreateProduct = (props) => {
    const { closeModal, product } = props;
    const { control, handleSubmit, errors, setValue } = useForm();

    const title = product ? 'Edit product' : 'Create product';

    useEffect(() => {
        const loadProduct = () => {
            if (product) {
                setValue('code', product.code);
                setValue('name', product.name);
                setValue('price', product.price);
                setValue('category', product.category);
            }
        }
        loadProduct();
    }, [product, setValue])

    const onSubmit = async (data) => {
        try {
            if (!product?._id) {
                createProduct(data);
            } else {
                data._id = product._id;
                editProduct(data);
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const createProduct = async(data) => {
        const resp = await ProductService.createProducts(data);
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
        } else if(resp.status === 201 ) {
            closeModal();
            Swal.fire({
                title: 'Success!',
                html: `The Product has been created`,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }    
    }

    const editProduct = async(data) => {
        const resp = await ProductService.editProducts(data);
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
        } else if(resp.status === 200 ) {
            closeModal();
            Swal.fire({
                title: 'Success!',
                html: `The Product has been edit`,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }
    }

    return (
        <>
            <Modal.Header closeButton={false}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="code"
                        control={control}
                        defaultValue=""
                        render={
                            ({ onChange, value }) => (
                                <TextField
                                    onChange={onChange}
                                    value={value}
                                    label="Code"
                                    errorMessage={errors.code && errors.code.message}
                                />
                            )
                        }
                        rules={{ required: 'This field is required' }}
                    />
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={
                            ({ onChange, value }) => (
                                <TextField
                                    onChange={onChange}
                                    value={value}
                                    label="Name"
                                    errorMessage={errors.name && errors.name.message}
                                />
                            )
                        }
                        rules={{ required: 'This field is required' }}
                    />
                    <Controller
                        name="price"
                        control={control}
                        defaultValue=""
                        render={
                            ({ onChange, value }) => (
                                <TextField
                                    onChange={onChange}
                                    value={value}
                                    label="Price"
                                    errorMessage={errors.price && errors.price.message}
                                />
                            )
                        }
                        rules={{ required: 'This field is required' }}
                    />
                    <Controller
                        name="category"
                        control={control}
                        defaultValue=""
                        render={
                            ({ onChange, value }) => (                                
                                <SingleSelect 
                                    onChange={onChange}
                                    value={value}
                                    label="Category" 
                                    id="s1"
                                    errorMessage={errors.category && errors.category.message}
                                >
                                    <option value="">Select category</option>
                                    <option value="FOOD">FOOD</option>
                                    <option value="TECH">TECH</option>
                                    <option value="TOYS">TOYS</option>
                                </SingleSelect>
                            )
                        }
                        rules={{ required: 'This field is required' }}
                    />

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal} shape="flat" color="info">
                    Cancel
                </Button>
                <Button color="info" type="submit" onClick={handleSubmit(onSubmit)}>{title}</Button>
            </Modal.Footer>
        </>
    )
}

export default CreateProduct;
