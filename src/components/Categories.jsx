import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {categories} from "../data";
import CategoryItem1 from "./CategoryItem1";
import {mobile} from "../responsive";
import axios from "axios";
import {publicRequest} from "../requestMethods";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({padding: "0", flexDirection: "column"})}
`

const Categories = () => {

    const [categories, setCategories] = useState([])

    const [r, sr] = useState(null)

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await publicRequest.get("/category", {withCredentials: true});

                setCategories(res.data ? res.data : [])
            } catch (error) {
            }
        };
        getCategories()
    }, [r]);

    return (
        <Container>
            {categories.map(item => (
                <CategoryItem1 item={item} key={item.id}/>
            ))}
        </Container>
    )
}

export default Categories;