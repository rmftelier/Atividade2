import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import { Box, Button, Card, Center, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import api from '../services/api';

import Cadastro from './Cadastro'

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

   
    //Adicionando a Carteira
    const addCarteira = async(nome, saldo, moedaId) => {

        try {
           const response = await api.post("/api/Carteiras", {
              nome: nome,
              saldo: parseFloat(saldo),
              moedaId: parseInt(moedaId)
           });

           setCarteiras(prevCarteiras => [response.data, ...prevCarteiras]);

        } catch(error){
           console.log(error);
        }
    };

   
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

            <Cadastro addCarteira={addCarteira} />
            
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
                    {/* Tem que ver isso daqui como retornar*/}
                    <Box mb={4}>Moeda: {carteira.moedaId.nome}</Box>
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
      )
};




   

