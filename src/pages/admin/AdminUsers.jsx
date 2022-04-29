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

const AdminUsers = () => {
    const [users, setUsers] = useState([])

    const [r, sr] = useState(null)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await publicRequest.get("/user", {withCredentials: true});

                setUsers(res.data ? res.data : [])
            } catch (error) {
            }
        }
        getUsers()
    }, [r]);

    const headings = [
        'ID',
        'Username',
        'Email',
        'Role',
        'First name',
        'Last name',
    ];

    const rows = users.map(user => [
        user.id,
        user.username,
        user.email,
        user.role,
        user.firstName,
        user.lastName
    ])

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

export default AdminUsers;