import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ChakraProvider, Tabs, TabList, Tab, TabPanels, TabPanel, Box, VStack, Heading, SimpleGrid, HStack, Image, Text } from '@chakra-ui/react';

const promise = loadStripe(
  "pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL"
);

function ViralPage() {
  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading as="h2" size="xl" mb={4}>Clothes</Heading>
        <SimpleGrid columns={[2, null, 4]} spacing="40px">
          {/* TODO: Insert clothing images here */}
          {/* Example: <Image src="/path/to/clothing/image.jpg" alt="Clothing item" /> */}
          {/* Repeat for each clothing item */}
        </SimpleGrid>
      </Box>

      {/* This section is for displaying images and doesn't require user insertion */}
      <Box>
        <Heading as="h2" size="xl" mb={4}>Image Carousel</Heading>
        <HStack spacing={4} overflowX="auto" p={4}>
          {[...Array(5)].map((_, i) => (
            <Image key={i} boxSize="200px" src={`https://via.placeholder.com/200x200?text=Image${i + 1}`} alt={`Carousel Image ${i + 1}`} />
          ))}
        </HStack>
      </Box>

      <Box>
        <Heading as="h2" size="xl" mb={4}>Products</Heading>
        <SimpleGrid columns={[2, null, 4]} spacing="40px">
          {/* TODO: Insert product images here */}
          {/* Example: <Image src="/path/to/product/image.jpg" alt="Product item" /> */}
          {/* Repeat for each product item */}
        </SimpleGrid>
      </Box>
    </VStack>
  );
}

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
            <Route path="/">
              <Header />
              <Box p={4}>
                <Tabs variant="enclosed">
                  <TabList>
                    <Tab>Today's deals</Tab>
                    <Tab>Amazon Basics</Tab>
                    <Tab>Buy Again</Tab>
                    <Tab>Prime Video</Tab>
                    <Tab>Viral</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Home />
                    </TabPanel>
                    <TabPanel>
                      <p>Content for Amazon Basics</p>
                    </TabPanel>
                    <TabPanel>
                      <p>Content for Buy Again</p>
                    </TabPanel>
                    <TabPanel>
                      <p>Content for Prime Video</p>
                    </TabPanel>
                    <TabPanel>
                      <ViralPage />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Route>
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
