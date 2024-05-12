import { useState, useEffect } from "react";
import { Container, Button, VStack, Text, Box, Image, useToast, SimpleGrid, Icon } from "@chakra-ui/react";
import { FaSeedling, FaTint, FaDollarSign, FaHandHoldingWater } from "react-icons/fa";

const Index = () => {
  const [money, setMoney] = useState(100);
  const [seeds, setSeeds] = useState(0);
  const [plants, setPlants] = useState(0);
  const [farmGrid, setFarmGrid] = useState(Array(100).fill({ state: "empty" }));
  const toast = useToast();

  // Removed unused useEffect block

  const buySeeds = () => {
    if (money >= 10) {
      setMoney(money - 10);
      setSeeds(seeds + 1);
      toast({
        title: "Seeds purchased!",
        description: "You have bought a seed.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Not enough money!",
        description: "You need more money to buy seeds.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const plantSeeds = (index) => {
    if (seeds > 0 && farmGrid[index].state === "empty") {
      setSeeds(seeds - 1);
      const newGrid = [...farmGrid];
      newGrid[index] = { state: "seeded" };
      setFarmGrid(newGrid);
      toast({
        title: "Seeds planted!",
        description: "Your seeds have been planted. Remember to water them!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "No seeds to plant!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const waterPlants = (index) => {
    if (farmGrid[index].state === "seeded") {
      const newGrid = [...farmGrid];
      newGrid[index] = { state: "growing" };
      setFarmGrid(newGrid);
      toast({
        title: "Plants watered!",
        description: "Your plants have been watered. Wait for them to grow!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Cannot water now!",
        description: "You need to plant seeds first or they are already watered.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const harvestPlants = (index) => {
    if (farmGrid[index].state === "mature") {
      const newGrid = [...farmGrid];
      newGrid[index] = { state: "empty" };
      setFarmGrid(newGrid);
      setPlants(plants + 1);
      toast({
        title: "Plants harvested!",
        description: "You have harvested your plants. You can sell them now!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Not ready to harvest!",
        description: "Your plants are not ready to harvest yet.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const sellPlants = () => {
    if (plants > 0) {
      setMoney(money + 20 * plants);
      setPlants(0);
      toast({
        title: "Plants sold!",
        description: `You have sold your plants for $${20 * plants}.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "No plants to sell!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to Saverville</Text>
        <Text>Money: ${money}</Text>
        <Text>Seeds: {seeds}</Text>
        <Text>Plants: {plants}</Text>
        <Box>
          <Button leftIcon={<FaSeedling />} colorScheme="green" onClick={buySeeds}>
            Buy Seeds ($10)
          </Button>
          <Button leftIcon={<FaHandHoldingWater />} colorScheme="blue" onClick={plantSeeds} ml={2}>
            Plant Seeds
          </Button>
          <Button leftIcon={<FaTint />} colorScheme="teal" onClick={waterPlants} ml={2}>
            Water Plants
          </Button>
          <Button leftIcon={<FaDollarSign />} colorScheme="yellow" onClick={harvestPlants} ml={2}>
            Harvest Plants
          </Button>
          <Button leftIcon={<FaDollarSign />} colorScheme="orange" onClick={sellPlants} ml={2}>
            Sell Plants
          </Button>
        </Box>
        <SimpleGrid columns={10} spacing={2}>
          {farmGrid.map((cell, index) => (
            <Box key={index} p={5} borderWidth="1px" borderRadius="lg">
              {cell.state === "empty" && <Text>Empty</Text>}
              {cell.state === "seeded" && <Icon as={FaSeedling} />}
              {cell.state === "growing" && <Icon as={FaSeedling} />}
              {cell.state === "mature" && <Image src="https://images.unsplash.com/photo-1700737503382-0877e9b441f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxoYXJ2ZXN0ZWQlMjBwbGFudHN8ZW58MHx8fHwxNzE1NTI5MzYwfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Harvested Plants" boxSize="50px" />}
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
