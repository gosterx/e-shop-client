import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  margin-top: 15px;
`

const Announcement = (page) => {
    return (
        <Container>
            Super Deal! Free Shipping on Orders Over $50
        </Container>
    )
}

export default Announcement;