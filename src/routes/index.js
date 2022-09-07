import React from 'react';
import { toast } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import history from '../services/history'
import MyRoute from './MyRoute';

export default function RotaPrinc() {
  toast.success('Oie Sucess');
  toast.error('Erros');

  return (
    <Routes history={history} MyRoute={MyRoute}>
      <Route path="/" element={<Login />} />
      <Route path="*" element={ <Page404 /> } />
    </Routes>
  );
};
