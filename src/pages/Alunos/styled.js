import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    font-weight: bold;
  }

  div + div {
    border-top: 2px solid #eee
  }
`;



export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const NovoAluno = styled(Link)`

  display: block;
  padding: 5px;
  color: white;
  background: black;
  width: 50%;
  text-align: center;
  justify-content: center;
  margin-top: 20px

`;

export const Title = styled.h1`
  text-align: center;
`


