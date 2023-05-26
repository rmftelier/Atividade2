import React, { useState } from 'react';
import { Box, Center, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import api from '../services/api'
import { useNavigate, useParams } from 'react-router';


export default function EditarCarteira() {

    const navigate = useNavigate();
    const { id } = useParams();

    //Cadastro Nome, Saldo, ID da Moeda
    const [nome, setNome] = useState('');

    //Tenho que manter o saldo, como manterei o saldo?
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await api.put(`/api/Carteiras/${id}`, {
          id: id,
          nome: nome
        });

        // Aqui você pode tratar a resposta se necessário
        console.log(response.data);
        
        // Limpar os campos do formulário
        setNome('');

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
          <Heading as="h1" mb={4} textAlign="center">Edição da Carteira</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Novo nome da Carteira</FormLabel>
              <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </FormControl>
            <Button colorScheme="teal" type="submit" >
              Atualizar
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


