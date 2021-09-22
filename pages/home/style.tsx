import styled from 'styled-components'
import { TextField, Card } from "@material-ui/core"

export const Title = styled.h1`
font-size: 40px;
    font-weight: 700;
    margin: 0px;
    text-align: center;
    color: rgb(51, 51, 51);
`;

export const Text = styled.h3`
    text-align: center;
    color: rgb(51, 51, 51);
`;

export const Main = styled.div`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardComponent = styled(Card)`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90vh;
`;

export const Logo = styled.img`
  max-height: 10vh;
  width: auto;
`;

export const Input = styled(TextField)`
`;

export const Ballance = styled.div`
`;