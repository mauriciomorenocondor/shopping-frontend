import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from "react-router-dom";

import Navbar from 'emerald-ui/lib/Navbar';
import Nav from 'emerald-ui/lib/Nav';
import DropdownButton from 'emerald-ui/lib/DropdownButton';
import DropdownItem from 'emerald-ui/lib/DropdownItem';
import Icon from 'emerald-ui/lib/Icon';
import Avatar from 'emerald-ui/lib/Avatar';
import Modal from 'emerald-ui/lib/Modal';
import RedIndicator from 'emerald-ui/lib/RedIndicator';
import ProductService from '../../services/ProductService';
import ShoppingCar from '../views/ShoppingCar';

const NavbarHeader = (props) => {
    const { listCart, setListCart } = props;
    let history = useNavigate();
    const [ showModal, setShowModal] = useState(false);
    const [ viewProducts, setViewProducts ] = useState(false);
    const [ data, setData ] = useState(false);

    useEffect(() => {
        const getProductsCart = async() => {
            const resp = await ProductService.listProductsCart();
            // If exist an product, show notification
            if (resp?.data?.data?.products?.length > 0) {
                setViewProducts(true)
                setData(resp.data?.data);
            }else{
                setViewProducts(false);
                setData(resp.data?.data);
            }
        }
        getProductsCart();
    }, [listCart]);

    const admin = () => {
        history("/products/admin")
    }

    const openModal = () => {
        setShowModal(!showModal);
    }
    
    const closeModal = () => {
        setShowModal(!showModal)
    }

    const refreshList = () => {
        setListCart(!listCart);
    }

    return (
        <>
            <Navbar breakAt="lg">
                <Navbar.Brand>
                    <span>
                        <h1>Shop.co</h1>
                    </span>
                </Navbar.Brand>
                <Nav grow collapsible>
                    <NavLink to="/" >
                        Home
                    </NavLink>

                    <NavLink to="/products" >
                        Products
                    </NavLink>
                </Nav>
                <Nav collapsible>
                    <a href="#foo" onClick={openModal}>
                    <RedIndicator active={viewProducts} aria-label="mail">
                        <Icon name="email" />
                    </RedIndicator>
                    </a>
                    <DropdownButton
                        noCaret
                        fromRight
                        id="dd2"
                        title={<Avatar title="Ad" />}
                    >
                        <DropdownItem eventKey="1" icon="key">Login</DropdownItem>
                        <DropdownItem separator />
                        <DropdownItem eventKey="2" icon="settings" onClick={admin}>
                            {/* <NavLink to="/products/admin"> */}
                                Admin Products
                            {/* </NavLink> */}
                    </DropdownItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
            
            <div>
                <Modal
                    onHide={closeModal}
                    show={showModal}
                >
                    <ShoppingCar refreshList={refreshList} data={data} closeModal={closeModal} />
                </Modal>
            </div>
        </>
    )
}

export default NavbarHeader