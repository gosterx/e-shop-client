import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import {mobile} from "../../responsive";
import {publicRequest} from "../../requestMethods";
import DataTable from "./DataTable";

const Container = styled.div`
`

const Wrapper = styled.div`
  padding: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-size: cover;
  ${mobile({padding: "10px"})}
`


const AdminOrders = () => {
    const [orders, setOrders] = useState([])

    const [r, sr] = useState(null)

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await publicRequest.get("/checkout/orders", {withCredentials: true});

                setOrders(res.data ? res.data : [])
            } catch (error) {
            }
        }
        getOrders()
    }, [r]);

    const headings = [
        'ID',
        'First name',
        'Last name',
        'Email',
        'Address',
        'Phone',
        'Payment',
        'Amount($)',
        'Status',
    ];

    const rows = orders.map(order => [
        order.id,
        order.firstName,
        order.lastName,
        order.email,
        order.address,
        order.phone,
        order.payment,
        order.amount,
        order.status])

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <DataTable headings={headings} rows={rows} />
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default AdminOrders;