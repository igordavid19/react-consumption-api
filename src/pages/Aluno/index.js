import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, SubTitle, Title } from './styled';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading'
import * as actions from '../../store/modules/auth/actions'
import { Link } from 'react-router-dom';

export default function Aluno({ match, history }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!id) return;


    async function getData() {
      setIsLoading(true);
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Photo = get(data, 'Photos[0].url', '');

        setPhoto(Photo)

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false)
      } catch(err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if(status === 400) errors.map(error => toast.error(error));
        history.push('/')
      }
    }
    getData();
  }, [id, history]);

  const handleSubmit = async e => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 4 || nome.length > 254 ){
      toast.warn(' Nome precisa ter entre 4 e 254 caracteres', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      formErrors = true;

    };
    if (sobrenome.length < 4 || sobrenome.length > 254 ){
      toast.warn(' Sobrenome precisa ter entre 4 e 254 caracteres', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      formErrors = true;

    };
    if (!isEmail(email)){
      toast.warn('E-mail inválido. Realize a correção', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      formErrors = true;

    };
    if(!isInt(String(idade))) {
      toast.warn('Idade inválida', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      formErrors = true;
    }
    if(!isFloat(String(peso))) {
      toast.warn('Peso inválido', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      formErrors = true;
    }
    if(!isInt(String(altura))) {
      toast.warn('Altura inválida', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      formErrors = true;
    }

    if(formErrors) return;

    try {
      setIsLoading(true)
      if(id) {
        //Edit
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Dados do Aluno(a) editados com sucesso', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } else {
        await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
      });
      toast.success('Aluno(a) criado(a) com sucesso', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      }
      setIsLoading(false)
    } catch(err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', [])

      if(errors.length > 0) {
        errors.map(error => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if(status === 401) dispatch(actions.loginFailure());
    }
  };


  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title> {id ? 'Editar aluno' : 'Novo aluno'} </Title>
      <SubTitle> {id ? '(Edite com as novas informações)' : '(Informações do novo aluno)'} </SubTitle>

      {id && (
        <ProfilePicture>
          {photo ? (
            <img crossOrigin="anonymous" src={photo} alt={nome}></img>
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </ Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={e => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="number"
          value={idade}
          onChange={e => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="text"
          value={peso}
          onChange={e => setPeso(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="text"
          value={altura}
          onChange={e => setAltura(e.target.value)}
          placeholder="Altura (em cm)"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired
}
