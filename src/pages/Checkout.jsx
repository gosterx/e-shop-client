import React, {useState} from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {publicRequest} from "../requestMethods";
import {cleanCart} from "../redux/apiCalls";

const Container = styled.div``

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
const Checkout = () => {

    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [home, setHome] = useState("")
    const [flat, setFlat] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [paymentMethod, setPaymentMethods] = useState("")


    const cart = useSelector(state => state.cart)

    const user = useSelector(state => state.user.currentUser)

    const history = useHistory();

    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault();

        const products = cart.products.map(item =>
            ({
                "id": item.id,
                "title": item.title,
                "size": item.size,
                "color": item.color,
                "price": item.price,
                "quantity": item.quantity
            })
        )
        const total = cart.total

        const address = city + ", улица " + street + ", д. " + home + ", кв. " + flat

        const order = {
            "userId": user.id,
            "address": address,
            "phoneNumber": phoneNumber,
            "products": products,
            "total": total,
            "paymentMethods": paymentMethod
        }

        const checkout = async () => {
            try {
                const res = await publicRequest.post("/checkout", order, {withCredentials: true})
                cleanCart(dispatch)
            } catch {}
        };

        checkout().then(res => history.push("/"))
        console.log(order)
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>CHECKOUT</Title>
                <Form>
                    <Label>Город:</Label>
                    <Select name="city" onChange={(e) => setCity(e.target.value)}>
                        <Option disabled selected>Город</Option>
                        <Option>Минск</Option>
                        <Option>Гродно</Option>
                        <Option>Брест</Option>
                        <Option>Могилев</Option>
                        <Option>Витебск</Option>
                        <Option>Гомель</Option>
                    </Select>
                    <Label>Улица:</Label>
                    <Input onChange={(e) => setStreet(e.target.value)}/>
                    <Label>Дом:</Label>
                    <Input onChange={(e) => setHome(e.target.value)}/>
                    <Label>Квартира:</Label>
                    <Input onChange={(e) => setFlat(e.target.value)}/>
                    <Label>Номер телефона:</Label>
                    <Input onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <Label>Способ оплаты:</Label>
                    <Select name="payment" onChange={(e) => setPaymentMethods(e.target.value)}>
                        <Option disabled selected>Оплата</Option>
                        <Option>Наличными курьеру</Option>
                        <Option>Картой курьеру</Option>
                    </Select>
                    <Button onClick={handleClick}>CHECKOUT</Button>
                </Form>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Checkout;