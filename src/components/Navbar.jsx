import React, {Fragment} from "react";
import styled from "styled-components";
import {Search, ShoppingCartOutlined, BuildOutlined} from "@material-ui/icons";
import {Badge} from "@material-ui/core";
import {mobile} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logOut} from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  ${mobile({height: "50px"})}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({padding: "10px 0"})}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display: "none"})}
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`

const Input = styled.input`
  border: none;

  ${mobile({width: "50px"})}
  &:focus {
    outline: none;
  }
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({fontSize: "24px"})}
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({justifyContent: "center", flex: "2"})}
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({fontSize: "12px", marginLeft: "10px"})}
`

const Button = styled.button`
  font-size: 14px;
  margin-left: 25px;
  border: none;
  background-color: white;
`

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)

    const user = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault();
        logOut(dispatch);
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search"/>
                        <Search style={{color: "gray", fontSize: 16}}/>
                    </SearchContainer>
                </Left>
                <Center><Link to="/" style={{textDecoration: 'none'}}><Logo>SNEAKER BAR</Logo></Link></Center>
                <Right>
                    {user
                        ? <Button onClick={handleClick}>LOG OUT</Button>
                        : <Fragment>
                            <Link to={`/register`}
                                  style={{textDecoration: 'none', color: "black"}}><MenuItem>REGISTER</MenuItem></Link>
                            <Link to={`/login`} style={{textDecoration: 'none', color: "black"}}><MenuItem>SIGN
                                IN</MenuItem></Link>
                        </Fragment>
                    }
                    {
                        user ? (user.role === "admin" ?
                        <Link to="/admin" style={{textDecoration: 'none', color: "black"}}>
                            <MenuItem>
                                <Badge>
                                    <BuildOutlined/>
                                </Badge>
                            </MenuItem>
                        </Link> : <Fragment/>) : <Fragment/>
                    }
                    <Link to="/cart" style={{textDecoration: 'none', color: "black"}}>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined/>
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;