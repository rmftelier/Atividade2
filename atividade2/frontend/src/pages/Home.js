import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, Center, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import api from '../services/api';


const Home = () => {
  const [carteiras, setCarteiras] = useState([]);
  

  // Função para buscar as carteiras da API
  useEffect(() => {
    api
      .get('/api/Carteiras')
      .then(response => {
        setCarteiras(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const fetchCarteiras = async () => {
    try {
      const response = await api.get('/api/Carteiras');
      setCarteiras(response.data);
    } catch (error) {
      console.error('Erro ao buscar as carteiras:', error);
    }
  };

 
  //Função para excluir a Carteira
  const excluirCarteira = async(id) =>{
      try{
        const response = await api.delete(`/api/Carteiras/${id}`);
        if (response.status === 204){
            //A exclusão foi bem-sucedida, você pode atualizar a lista de carteiras aqui
            fetchCarteiras();
        }
      } catch(error){
        console.error('Erro ao excluir a carteira', error);
      }
  };

  return (
  <Center h="100vh">
      <Box p={4}>
        <Heading as="h1" mb={4} textAlign="center">CriptoCarteira</Heading>
        <Button 
          colorScheme="teal" 
          mr={4}
          as={Link}
          to="/cadastro-carteira"
        >
          Cadastro de Carteira
        </Button>
        <Button as={Link} to="/transferencia" colorScheme="teal">Transferência entre Carteiras</Button>

        {/* Listagem das Carteiras que estão na API */}
        <Box mt={4}>
          <Heading as="h2" size="lg" mb={2} >Carteiras</Heading>
          <SimpleGrid columns={2} spacing={4}>
          {carteiras.map((carteira) => (
              <Card size="lg" key={carteira.id} p={4} borderWidth="1px" borderRadius="md">

                <Heading as="h3" size="md" mb={2}>
                    {carteira.nome}
                </Heading>
                <Divider />
                <Box mb={2}>Saldo: {carteira.saldo}</Box>
                <Box mb={4}>Moeda: {carteira.moeda?.nome}</Box>
                <Box display="flex" alignItems="center">
                  <Button 
                      variant="solid" 
                      colorScheme="teal" 
                      mr={2}
                  >
                      Editar
                  </Button>
                  <Button 
                        variant="solid" 
                        colorScheme="red"
                        onClick={() => excluirCarteira(carteira.id)}
                  >
                     Excluir
                  </Button>
                </Box>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Center>
  );
};

export default Home;
