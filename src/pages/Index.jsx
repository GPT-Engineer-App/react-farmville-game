import { useState, useEffect } from "react";
import { Container, Button, VStack, Text, Box, Image, useToast, SimpleGrid, Icon, HStack, Badge } from "@chakra-ui/react";
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
          newGrid[index] = { state: "harvested" };
          setTimeout(() => {
            newGrid[index] = { state: "empty" };
            setFarmGrid(newGrid);
          }, 500);
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
    <VStack spacing={4} align="stretch" p={4}>
      <Box p={4} bg="blue.500" color="white" display="flex" justifyContent="space-between">
        <Text fontSize="3xl">Saverville Farm</Text>
        <HStack spacing={4}>
          <Button colorScheme="yellow" onClick={buySeeds}>
            Buy Seeds
          </Button>
          <Button colorScheme="red" onClick={sellPlants}>
            Sell Plants
          </Button>
          <Text fontSize="xl" textAlign="right">
            Wallet: ${money}
          </Text>
        </HStack>
      </Box>
      <HStack justifyContent="space-between">
        <HStack spacing={4}>
          <Button colorScheme="green" onClick={() => setMode("planting")} bg={mode === "planting" ? "green.500" : "green.200"}>
            Plant
          </Button>
          <Button colorScheme="blue" onClick={() => setMode("watering")} bg={mode === "watering" ? "blue.500" : "blue.200"}>
            Water
          </Button>
          <Button colorScheme="orange" onClick={() => setMode("harvesting")} bg={mode === "harvesting" ? "orange.500" : "orange.200"}>
            Harvest
          </Button>
        </HStack>
        <HStack spacing={4}>
          <Box bg="lightgreen" p={2} borderRadius="md">
            Seeds{" "}
            <Badge ml={1} colorScheme="yellow">
              {seeds}
            </Badge>
          </Box>
          <Box bg="darkgreen" p={2} borderRadius="md">
            Plants{" "}
            <Badge ml={1} colorScheme="yellow">
              {plants}
            </Badge>
          </Box>
        </HStack>
      </HStack>

      <HStack spacing={4}>
        <Box flex="1">
          <Image src={`images/${mode}.png`} alt={`${mode} mode`} boxSize="100%" />
        </Box>
        <SimpleGrid columns={10} spacing={1} templateColumns="repeat(10, 1fr)" minChildWidth="20px" flex="2">
          {farmGrid.map((cell, index) => (
            <Box key={index} p={2} borderWidth="1px" borderRadius="lg" onClick={() => handleGridClick(index)}>
              {cell.state === "empty" && <Box bg="#8B4513" p={2} borderWidth="1px" borderRadius="lg" />}
              {cell.state === "seeded" && <Box bg="lightgreen" p={2} borderWidth="1px" borderRadius="lg" />}
              {cell.state === "growing" && <Box bg="green" p={2} borderWidth="1px" borderRadius="lg" />}
              {cell.state === "mature" && <Image src="https://images.unsplash.com/photo-1700737503382-0877e9b441f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxoYXJ2ZXN0ZWQlMjBwbGFudHN8ZW58MHx8fHwxNzE1NTI5MzYwfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Harvested Plants" boxSize="30px" />}
            </Box>
          ))}
        </SimpleGrid>
      </HStack>
    </VStack>
  );
};

export default Index;
