import React, { useState } from 'react';
import { Box, Center, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import api from '../services/api';

const CadastroCarteira = () => {
  const [nome, setNome] = useState('');
  const [saldo, setSaldo] = useState('');
  const [moedaId, setMoedaId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaCarteira = {
      Nome: nome,
      Saldo: parseFloat(saldo),
      MoedaId: parseInt(moedaId),
    };
    console.log('Dados enviados: ', novaCarteira);

    try {
      const response = await api.post('/api/Carteiras', novaCarteira);
      console.log('Carteira cadastrada: ', response.data);


      setNome('');
      setSaldo('');
      setMoedaId('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center v="100vh">
      <Box p={4}>
        <Heading>Cadastro da Carteira</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Nome da Carteira</FormLabel>
            <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Saldo</FormLabel>
            <Input type="number" value={saldo} onChange={(e) => setSaldo(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>ID da Moeda</FormLabel>
            <Input type="text" value={moedaId} onChange={(e) => setMoedaId(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Cadastrar
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default CadastroCarteira;

