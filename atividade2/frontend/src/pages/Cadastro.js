import React, { useState } from 'react';
import { Box, Center, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import api from '../services/api'
import { useNavigate } from 'react-router';

export default function CadastroCarteira() {
    const navigate = useNavigate();

    //Cadastro Nome, Saldo, ID da Moeda
    const [nome, setNome] = useState('');
    const [saldo, setSaldo] = useState('');
    const [moedaId, setMoedaId] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await api.post("/api/Carteiras", {
          nome: nome,
          saldo: parseFloat(saldo),
          moedaId: parseInt(moedaId)
        });

        // Aqui você pode tratar a resposta se necessário
        console.log(response.data);

        
        // Limpar os campos do formulário
        setNome('');
        setSaldo('');
        setMoedaId('');

        // Redirecionar para a página Home
        return navigate('/', {replace: true});

      } catch (error) {
        console.log(error);
      }
    }

    //Para voltar para a página anterior
    const handleGoBack = () => {
      navigate(-1);
    };

    return (
      <Center h="100vh">
        <Box p={4}>
          <Heading as="h1" mb={4} textAlign="center">Cadastro da Carteira</Heading>
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
              <Input type="number" value={moedaId} onChange={(e) => setMoedaId(e.target.value)} />
            </FormControl>
            <Button colorScheme="teal" type="submit" >
              Cadastrar
            </Button>
            <Button colorScheme="teal" variant='outline' 
              onClick={handleGoBack}
              marginLeft={3}
            >
              Voltar
            </Button>
          </form>
        </Box>
      </Center>
    );
};


