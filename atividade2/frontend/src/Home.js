import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Center, Card, SimpleGrid, Divider, Heading, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import api from './services/api';

const Home = () => {
  const [carteiras, setCarteiras] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaCarteiraNome, setNovaCarteiraNome] = useState('');

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


  // Função para cadastrar uma nova carteira
  const cadastrarCarteira = async () => {
    try {
      const response = await api.post('/api/Carteiras', { nome: novaCarteiraNome });
      if (response.status === 201) {
        // Caso o cadastro seja bem-sucedido, atualiza a lista de carteiras e fecha o modal
        setNovaCarteiraNome('');
        setIsModalOpen(false);
        fetchCarteiras();
      } else {
        console.error('Erro ao cadastrar a carteira:', response.status);
      }
    } catch (error) {
      console.error('Erro ao cadastrar a carteira:', error);
    }
  };
  
  const fetchCarteiras = async () => {
    try {
      const response = await api.get('/api/Carteiras');
      setCarteiras(response.data);
    } catch (error) {
      console.error('Erro ao buscar as carteiras:', error);
    }
  };
  
  useEffect(() => {
    fetchCarteiras();
  }, []);

  return (
  <Center h="100vh">
      <Box p={4}>
        <Heading as="h1" mb={4} textAlign="center">CriptoCarteira</Heading>

        <Button as={Link} to="/cadastro" colorScheme="teal" mr={4}>Cadastro de Carteira</Button>
        <Button as={Link} to="/transferencia" colorScheme="teal">Transferência entre Carteiras</Button>

        {/* Modal de Cadastro de Carteira */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastro de Carteira</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nome da Carteira</FormLabel>
                <Input type="text" value={novaCarteiraNome} onChange={(e) => setNovaCarteiraNome(e.target.value)} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={cadastrarCarteira}>Cadastrar</Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Listagem de Carteiras */}
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
                  <Button variant="solid" colorScheme="teal" mr={2}>
                      Editar
                  </Button>
                  <Button variant="solid" colorScheme="red">
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
