import { Card, CardGrid, Container, Table, Col, Button, IconButton } from 'emerald-ui';
import Icon from 'emerald-ui/lib/Icon';
import React, { useState } from 'react'
import { useQuery, gql } from "@apollo/client";
import Modal from 'emerald-ui/lib/Modal';

import CreateProduct from './../forms/CreateProduct'

const FILMS_QUERY = gql`
{
    products {
      _id
      code
      name
      price
      category
    }
  }
  `;

const ListProducts = () => {
    const { data, loading, error } = useQuery(FILMS_QUERY);
    const [ showModal, setShowModal] = useState(false);
    const [ product, setProduct ] = useState(null);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    const editProduct = ( product ) => {
        setProduct(product);
        openModal();
    }

    const openModal = () => {
        setShowModal(!showModal);
    }
    
    const closeModal = () => {
        setProduct(null);
        setShowModal(!showModal)
    }

    return (
        <>
            <Container>
                <CardGrid className="unique-card">
                    <Card>
                        <Col className="button-new">
                            <Button color="info" onClick={openModal}>
                                <Icon name="create" />
                                <span>Create product</span>
                            </Button>
                        </Col>
                        <div style={{ overflow: 'auto' }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.products && data.products.length > 0 && (
                                        data.products.map((dataRes, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{dataRes.code}</td>
                                                    <td>{dataRes.name}</td>
                                                    <td>{dataRes.price}</td>
                                                    <td>{dataRes.category}</td>
                                                    <td>
                                                        <IconButton 
                                                            ariaLabel="Settings" 
                                                            color="info" 
                                                            icon="create" 
                                                            title="Edit"
                                                            onClick={() => editProduct(dataRes)} 
                                                            />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                </CardGrid>          
            </Container>

            <div>
                <Modal
                    onHide={closeModal}
                    show={showModal}
                >
                    <CreateProduct closeModal={closeModal} product={product} />
                </Modal>
            </div>
        </>
    )
}

export default ListProducts;
