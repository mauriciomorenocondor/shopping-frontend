import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useQuery, gql } from "@apollo/client";
import Swal from "sweetalert2";

import { Card, CardGrid, Container, Col, Button } from 'emerald-ui';
import TextField from 'emerald-ui/lib/TextField';
//import SingleSelect from 'emerald-ui/lib/SingleSelect';
import Row from 'emerald-ui/lib/Row';
import Icon from 'emerald-ui/lib/Icon';

import ProductService from '../../services/ProductService';


const Products = (props) => {
    const { setRefresList } = props;
    const { control, handleSubmit, errors } = useForm();
    const FILMS_QUERY = gql` { products { _id code name price category } } `;
    const { data, loading, error } = useQuery(FILMS_QUERY);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    const onSubmit = async (data) => {
        console.log("Data:", data);
    }

    const addCart = async( id ) => {
        const data = {
            "productId": id,
            "quantity": 1
        }
        try {
            const resp = await ProductService.addProductToCart(data);
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
            setRefresList();
        }
    }
    
    return (
        <>
        <Container>
            <Row>
                <Col xs={3} lg={3} sm={3} md={3}>
                    <CardGrid className="unique-card">
                        <Card>
                            <Col className="search-card">
                                <form  onSubmit={handleSubmit(onSubmit)}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        defaultValue=""
                                        render={
                                            ({ onChange, value }) => (
                                                <TextField
                                                    onChange={onChange}
                                                    value={value}
                                                    label="Search Products"
                                                    errorMessage={errors.name && errors.name.message}
                                                />
                                            )
                                        }
                                        rules={{ required: 'This field is required' }}
                                    />
                                        <Button color="info" type="button" onClick={handleSubmit(onsubmit)}>
                                            Search
                                        </Button>
                                </form>
                            </Col>
                        </Card>
                    </CardGrid>
                </Col>
                <Col xs={9} lg={9} sm={9} md={9}>
                    <CardGrid>
                        {data.products && data.products.length > 0 && (
                            data.products.map((dataRes, index) => {
                                return (
                                    <Card key={index}>
                                        <Card.Header color="info">
                                            <h1 className="eui-card-header-title shopping-card-header">{dataRes.name}</h1>
                                        </Card.Header>
                                        <h2 className="eui-card-subtitle">
                                            {dataRes.name}
                                        </h2>
                                        <p>
                                            <b>${dataRes.price}</b><br/>
                                            <b>{dataRes.category}</b><br/>
                                            <Button color="warning" onClick={() => addCart(dataRes._id)}>
                                                <Icon name="add" />
                                                <span>Add to cart</span>
                                            </Button>
                                        </p>
                                    </Card>    
                                );
                            })
                        )}
                    </CardGrid>
                </Col>
            </Row>
        </Container>
    </>

    )
}

export default Products;
