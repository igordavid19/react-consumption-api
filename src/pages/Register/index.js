import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import { useDispatch } from 'react-redux';

export default function Register() {
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, }));

  };

  return (
    <Container>

      <h1>Cadastre-se</h1>
      <h5>Preencha os campos*</h5>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" />
        </label>

        <label htmlFor="email">
          E-mail:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">Avançar</button>
      </Form>
    </Container>
  );
}

