import React, {useState} from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import {login} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {publicRequest} from "../requestMethods";
import {IconButton, InputAdornment} from "@material-ui/core";
import {Label, Visibility, VisibilityOff} from "@material-ui/icons";
import {Input} from "@material-ui/core";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5),
  rgba(255, 255, 255, 0.5)), url("https://img.championat.com/news/big/q/g/krossovki-radi-kotoryh-stali-ubivat_1634741526921569063.jpg") center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({width: "75%"})}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

// const Inputz = styled.Input`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
// `

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`

const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`

const Error = styled.span`
  color: red;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Login = () => {
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")

    const handleUsernameFocusOut = async () => {
        try {
            const res = await publicRequest.post("/validation/name", username)
            setUsernameError(res.data.message)
        } catch (e) {
        }
    }

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handlePasswordFocusOut = async () => {
        try {
            const res = await publicRequest.post("/validation/password", password)
            setPasswordError(res.data.message)
        } catch (e) {
        }
    }

    const dispatch = useDispatch()

    const {isFetching, error} = useSelector((state) => state.user)

    const handleClick = (e) => {
        e.preventDefault();
        let isValid = username !== "" &&
            usernameError === "" &&
            passwordError === ""

        if (isValid) {
            login(dispatch, {username, password});
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}
                           onBlur={handleUsernameFocusOut}
                    style={{
                        flex: 1,
                        minWidth: '40%',
                        margin: '10px 0',
                        padding: '10px'}}
                    />
                    <Error>{usernameError}</Error>
                    <Input placeholder="password"
                           type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)}
                           onBlur={handlePasswordFocusOut}
                           endAdornment= {
                               <InputAdornment position="end">
                                   <IconButton
                                       onClick={handleClickShowPassword}
                                       onMouseDown={handleMouseDownPassword}
                                   >
                                       {showPassword ? <Visibility /> : <VisibilityOff />}
                                   </IconButton>
                               </InputAdornment>
                           }
                           style={{
                               flex: 1,
                               minWidth: '40%',
                               margin: '10px 0',
                               padding: '10px'}}/>
                    <Error>{passwordError}</Error>
                    <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                    {error && <Error>Incorrect login or password</Error>}
                    <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                    <Link href="/register">CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;