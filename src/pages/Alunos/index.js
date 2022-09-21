import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture, NovoAluno, Title } from './styled';
import axios from '../../services/axios'
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = e => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove()
  }

  const handleDelete = async (e, id, index) => {
    e.persist()
    try {
      setIsLoading(true)
      await axios.delete(`/alunos/${id}`)
      const novosAlunos = [ ...alunos];
      novosAlunos.splice(index, 1);
      toast.success('Aluno excluido com sucesso')
      setAlunos(novosAlunos)
      setIsLoading(false);

    } catch (err){
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login')
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }

      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title > Alunos </Title>

      <NovoAluno to="/aluno/">Cadastrar novo</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Photos[0].url', false)
              ? <img crossOrigin="anonymous" src={aluno.Photos[0].url} alt="" />
              : <FaUserCircle size={36} />}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={18} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={18} />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={e => handleDelete(e, aluno.id, index)}
            />

          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
