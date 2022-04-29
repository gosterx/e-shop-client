import React, {useState} from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import {publicRequest} from "../requestMethods";
import {useHistory} from "react-router-dom";
import {IconButton, Input, InputAdornment} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

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
  width: 30%;
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

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const Error = styled.span`
  color: red;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`

const Register = () => {
    let valid = false

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")

    const handleNameFocusOut = async () => {
        try {
            const res = await publicRequest.post("/validation/name", name)
            setNameError(res.data.message)
        } catch (e) {
        }
    }

    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState("")

    const handleLastNameFocusOut = async () => {
        try {
            const res = await publicRequest.post("/validation/lastName", lastName)
            setLastNameError(res.data.message)
        } catch (e) {
        }
    }

    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")

    const handleUsernameFocusOut = async () => {
        try {
            const res = await publicRequest.post("/validation/username", username)
            setUsernameError(res.data.message)
        } catch (e) {
        }
    }

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const handleEmailFocusOut = async () => {
        try {
            const res = await publicRequest.post("/validation/email", email)
            setEmailError(res.data.message)
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

    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const handleConfirmPasswordFocusOut = async () => {
        try {
            const res = await publicRequest.post("/validation/confirmPassword", {
                password: password,
                confirm: confirmPassword
            })
            setConfirmPasswordError(res.data.message)
        } catch (e) {
        }
    }

    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        let isValid = name !== "" &&
            nameError === "" &&
            lastNameError === "" &&
            usernameError === "" &&
            emailError === "" &&
            passwordError === "" &&
            confirmPasswordError === "";
        if (isValid) {
            const register = async () => {
                try {
                    const res = await publicRequest.post("/registration", {
                        username: username,
                        email: email,
                        password: password,
                        lastName: lastName,
                        firstName: name
                    })
                } catch {
                }
            };
            register()
            history.push("/login")
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="name" onChange={(e) => setName(e.target.value)} onBlur={handleNameFocusOut} style={{
                        flex: 1,
                        minWidth: '40%',
                        margin: '20px 10px 0 0',
                        padding: '10px'}}/>
                    <Error>{nameError}</Error>
                    <Input placeholder="last name" onChange={(e) => setLastName(e.target.value)}
                           onBlur={handleLastNameFocusOut} style={{
                        flex: 1,
                        minWidth: '40%',
                        margin: '20px 10px 0 0',
                        padding: '10px'}}/>
                    <Error>{lastNameError}</Error>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}
                           onBlur={handleUsernameFocusOut} style={{
                        flex: 1,
                        minWidth: '40%',
                        margin: '20px 10px 0 0',
                        padding: '10px'}}/>
                    <Error>{usernameError}</Error>
                    <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailFocusOut} style={{
                        flex: 1,
                        minWidth: '40%',
                        margin: '20px 10px 0 0',
                        padding: '10px'}}/>
                    <Error>{emailError}</Error>
                    <Input placeholder="password" onChange={(e) => setPassword(e.target.value)}
                           onBlur={handlePasswordFocusOut}
                           type={showPassword ? "text" : "password"}
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
                        margin: '20px 10px 0 0',
                        padding: '10px'}}/>
                    <Error>{passwordError}</Error>
                    <Input placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)}
                           type={showConfirmPassword ? "text" : "password"}
                           endAdornment= {
                               <InputAdornment position="end">
                                   <IconButton
                                       onClick={handleClickShowConfirmPassword}
                                       onMouseDown={handleMouseDownPassword}
                                   >
                                       {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                   </IconButton>
                               </InputAdornment>
                           }
                           onBlur={handleConfirmPasswordFocusOut} style={{
                        flex: 1,
                        minWidth: '40%',
                        margin: '20px 10px 0 0',
                        padding: '10px'}}/>
                    <Error>{confirmPasswordError}</Error>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Link href="/login">ALREADY HAVE ACCOUNT</Link>
                    <Button onClick={handleClick}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register;