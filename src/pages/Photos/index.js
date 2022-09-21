import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading'
import { toast } from 'react-toastify';
import { Title, Form } from './styled'
import axios from '../../services/axios'
import history from '../../services/history'
import * as actions from '../../store/modules/auth/actions'

export default function Photos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '')

  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading (true)
        const {data} = await axios.get(`/alunos/${id}`)
        setPhoto(get(data, 'Photos[0].url', ''))
        setIsLoading (false);
      } catch {
        toast.error('Erro ao obter a imagem');
        setIsLoading (false);
        history.push('/')
      }
    }

    getData()

  }, [id])

  const handleChange  = async e => {
    const file = e.target.files[0];
    const photoURL = URL.createObjectURL(file);

    setPhoto(photoURL);

    const formData = new FormData();
    formData.append('aluno_id', id)
    formData.append('photo', file)

    try {
      setIsLoading(true)
      await axios.post('/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      toast.success('Foto Enviada com sucesso')


      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto.')

      if(status === 401) dispatch(actions.loginFailure())

    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title> Fotos </ Title>

      <Form>
        <label htmlFor="photo">
          {photo ? (
            <img crossOrigin="anonymous" src={photo} alt="Foto" />
          ) : 'Selecionar'}
          <input type="file" id="photo" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes =  {
  match: PropTypes.shape({}).isRequired,
}
