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

const Error = styled.span`
  color: red;
  align-items: center;
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

const AdminNewCategory = () => {
    const [image, setImage] = useState("")
    const [imageError, setImageError] = useState("")

    const handleImageFocusOut = async () => {
        try {
            const res = await publicRequest.post("/validation/category-image-link", image)
            setImageError(res.data.message)
        } catch (e) {
        }
    }

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")

    const handleTitleFocusOut = async () => {
        try {
            const res = await publicRequest.post("/validation/category-title", title)
            setTitleError(res.data.message)
        } catch (e) {
        }
    }

    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();

        let isValid = imageError === "" && titleError === ""

        const category = {
            "title": title,
            "image": image
        }

        const add = async () => {
            try {
                const res = await publicRequest.post("/category", category, {withCredentials: true})
            } catch {}
        };

        if (isValid) add().then(res => history.push("/admin"))
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>ADD CATEGORY</Title>
                <Form>
                    <label>Image url</label>
                    <Input name="image" onChange={(e) => setImage(e.target.value)} onBlur={handleImageFocusOut}/>
                    <Error>{imageError}</Error>
                    <Label>Title:</Label>
                    <Input name="title" onChange={(e) => setTitle(e.target.value)} onBlur={handleTitleFocusOut}/>
                    <Error>{titleError}</Error>
                    <Button onClick={handleClick}>ADD</Button>
                </Form>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default AdminNewCategory;