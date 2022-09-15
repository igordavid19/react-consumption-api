import React from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch } from 'react-redux';
import { get } from "lodash";

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from "../../store/modules/auth/actions";

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    let FormErrors = false;

    if (!isEmail(email)) {
      FormErrors = true;
      toast.error('E-mail inválido', {
        icon: "🚨"
      });
    }

    if (password.length < 6 || password.length > 30) {
      FormErrors = true;
      toast.error('Senha inválida', {
        icon: "🚨"
      });
    };

    if (FormErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath}))
  };

  return (
    <Container>
      <h1> Login </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
        <button type='submit'>Acessar</button>
      </Form>
    </ Container>
  );
}
