import React, {useState} from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import {mobile} from "../../responsive";
import {publicRequest} from "../../requestMethods";
import {useHistory} from "react-router-dom";

const Container = styled.div`
`

const Wrapper = styled.div`
  padding: 20px;
  align-items: center;
  justify-content: center;
  background-size: cover;
  ${mobile({padding: "10px"})}
`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  flex: 1;
  max-width: 40%;
  margin: 20px 10px 0 0;
  padding-top: 10px;
`

const Input = styled.input`
  flex: 1;
  max-width: 40%;
  margin: 20px 10px 0 0;
  padding-bottom: 10px;

  &:focus {
    outline: none;
  }
`

const Select = styled.select`
  padding: 20px;
  max-width: 40%;
  margin-right: 20px;
  ${mobile({margin: "10px 0"})}
`
const Option = styled.option``

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 20px;
`

const AdminNewProduct = () => {
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [sizes, setSizes] = useState("")
    const [colors, setColors] = useState("")
    const [price, setPrice] = useState("")

    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();

        const product = {
            "title": title,
            "description": description,
            "image": image,
            "categories": category.split(" "),
            "size": sizes.split(" "),
            "color": colors.split(" "),
            "price": parseInt(price),
            "inStock": true
        }

        const add = async () => {
            try {
                const res = await publicRequest.post("/product", product, {withCredentials: true})
            } catch {}
        };

        add().then(res => history.push("/admin"))
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>ADD PRODUCT</Title>
                <Form>
                    <label>Image url</label>
                    <Input name="image" onChange={(e) => setImage(e.target.value)}/>
                    <Label>Title:</Label>
                    <Input name="title" onChange={(e) => setTitle(e.target.value)}/>
                    <Label>Description:</Label>
                    <Input name="description" onChange={(e) => setDescription(e.target.value)}/>
                    <Label>Category:</Label>
                    <Input name="category" onChange={(e) => setCategory(e.target.value)}/>
                    <Label>Sizes:</Label>
                    <Input name="sizes" onChange={(e) => setSizes(e.target.value)}/>
                    <Label>Colors:</Label>
                    <Input name="colors" onChange={(e) => setColors(e.target.value)}/>
                    <Label>Price:</Label>
                    <Input name="price" onChange={(e) => setPrice(e.target.value)}/>
                    <Button onClick={handleClick}>ADD</Button>
                </Form>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default AdminNewProduct;