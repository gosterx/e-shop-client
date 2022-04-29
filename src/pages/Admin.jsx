import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Sidebar from "../admin/components/sidebar/Sidebar";
import Footer from "../components/Footer";


const Container = styled.div``

const Admin = () => {
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Sidebar/>
            <Footer/>
        </Container>
    )
}

export default Admin;