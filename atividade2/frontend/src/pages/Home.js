import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Stack, Card, Center, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import api from '../services/api';

export default function Home(){
    const [carteiras, setCarteiras] = useState([]);

    const fetchCarteiras = async() => {
          const response = await api.get("/api/Carteiras");
          setCarteiras(response.data);
    }

    //Para cada vez que a página for recarregada ele pegue as informações da api
    useEffect(() => {
        fetchCarteiras()
    }, []);

      
    //Excluir a carteira
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

    return(
        <Center h="100vh">
          <Box p={4}>
            <Heading as="h1" mb={4} textAlign="center">CriptoCarteira</Heading>
            <Stack alignItems='center'>
              <Button 
                  mr={4}
                  as={Link}
                  to="/cadastro-carteira"
              >  
                      Cadastrar Carteira 
              </Button>
            </Stack>
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
                    <Box display="flex" alignItems="center">
                      <Button 
                          variant="solid" 
                          colorScheme="teal" 
                          mr={2}
                          as={Link}
                          to={`/editar/${carteira.id}`}
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

