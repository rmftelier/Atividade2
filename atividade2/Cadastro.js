import React, { useState } from 'react';
import { Box, Center, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

export default function CadastroCarteira(props) {
    
    //Cadastro Nome, Saldo, ID da Moeda
    const [nome, setNome] = useState('');
    const [saldo, setSaldo] = useState('');
    const [moedaId, setMoedaId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addCarteira(nome, saldo, moedaId);
        //Default
        setNome('');
        setSaldo('');
        setMoedaId('');
    }

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
          <Button colorScheme="teal" type="submit">
            Cadastrar
          </Button>
        </form>
      </Box>
    </Center>
  );
};

