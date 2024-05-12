import { useState, useEffect } from "react";
import { Container, Button, VStack, Text, Box, Image, useToast, SimpleGrid, Icon } from "@chakra-ui/react";
import { FaSeedling, FaTint, FaDollarSign, FaHandHoldingWater } from "react-icons/fa";

const Index = () => {
  const [money, setMoney] = useState(100);
  const [seeds, setSeeds] = useState(0);
  const [plants, setPlants] = useState(0);
  const [farmGrid, setFarmGrid] = useState(Array(100).fill({ state: "empty" }));
  const [mode, setMode] = useState("planting");
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

  const handleGridClick = (index) => {
    switch (mode) {
      case "planting":
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
        break;
      case "watering":
        if (farmGrid[index].state === "seeded") {
          const newGrid = [...farmGrid];
          newGrid[index] = { ...farmGrid[index], state: "growing" };
          setFarmGrid(newGrid);
          toast({
            title: "Plant watered!",
            description: "Your plant has been watered. It's growing!",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
        break;
      case "harvesting":
        if (farmGrid[index].state === "mature") {
          const newGrid = [...farmGrid];
          newGrid[index] = { state: "empty" };
          setFarmGrid(newGrid);
          setPlants(plants + 1);
          toast({
            title: "Plant harvested!",
            description: "Your plant has been harvested!",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
        break;
      default:
        break;
    }
  };

  const waterPlants = () => {
    const newGrid = farmGrid.map((cell) => {
      if (cell.state === "seeded") {
        return { ...cell, state: "growing" };
      }
      return cell;
    });
    setFarmGrid(newGrid);
    toast({
      title: "Plants watered!",
      description: "All seeded plants have been watered. Wait for them to grow!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const harvestPlants = () => {
    const newGrid = farmGrid.map((cell, index) => {
      if (cell.state === "mature") {
        setPlants(plants + 1);
        return { ...cell, state: "empty" };
      }
      return cell;
    });
    setFarmGrid(newGrid);
    toast({
      title: "Plants harvested!",
      description: "You have harvested your plants. You can sell them now!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
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
          <Button leftIcon={<FaDollarSign />} colorScheme="orange" onClick={sellPlants} ml={2}>
            Sell Plants
          </Button>
        </Box>
        <Box>
          <Button colorScheme="green" onClick={() => setMode("planting")}>
            Planting Mode
          </Button>
          <Button colorScheme="blue" onClick={() => setMode("watering")} ml={2}>
            Watering Mode
          </Button>
          <Button colorScheme="orange" onClick={() => setMode("harvesting")} ml={2}>
            Harvesting Mode
          </Button>
        </Box>
        <SimpleGrid columns={10} spacing={2}>
          {farmGrid.map((cell, index) => (
            <Box key={index} p={5} borderWidth="1px" borderRadius="lg" onClick={() => handleGridClick(index)}>
              {cell.state === "empty" && <Text>Empty</Text>}
              {cell.state === "seeded" && <Box bg="lightgreen" p={5} borderWidth="1px" borderRadius="lg" />}
              {cell.state === "growing" && <Box bg="green" p={5} borderWidth="1px" borderRadius="lg" />}
              {cell.state === "mature" && <Image src="https://images.unsplash.com/photo-1700737503382-0877e9b441f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxoYXJ2ZXN0ZWQlMjBwbGFudHN8ZW58MHx8fHwxNzE1NTI5MzYwfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Harvested Plants" boxSize="50px" />}
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
