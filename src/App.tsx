import { useState, useEffect } from 'react';
import logo from './assets/logo.svg';
import cart from './assets/cart.svg';
import { useDisclosure } from '@mantine/hooks';
import './App.css';
import {
  AppShell,
  Image,
  Button,
  Group,
  Title,
  Box,
  Center,
  Loader,
} from '@mantine/core';
import { ModalCart } from './modules/modalCart/ModalCart';
import { CardShop } from './modules/CardShop/CardShop';
import ky from 'ky';

function App() {
  const [data, setData] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const vegetablesFetch = async () => {
      const vegetables = await ky
        .get(
          'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json'
        )
        .json();
      setData(vegetables);
      setLoading(false);
    };

    vegetablesFetch();
  }, []);

  function handleClick(card, value) {
    setList((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.id === card.id);

      if (existingItemIndex !== -1) {
        const updatedList = [...prev];
        updatedList[existingItemIndex] = {
          ...updatedList[existingItemIndex],
          quantity: value,
          currentPrice: card.price * value,
        };
        return updatedList;
      } else {
        return [
          ...prev,
          { ...card, currentPrice: card.price * value, quantity: value },
        ];
      }
    });
  }

  return (
    <AppShell header={{ height: 60 }} px={80} py={60}>
      <AppShell.Header bg="#fff" withBorder={false} px={20} py={15}>
        <Group justify="space-between" align="center" h="100%" wrap="nowrap">
          <Image src={logo} alt="logo" w={210} />
          <Button
            variant="filled"
            color="#54B46A"
            px={40}
            py={10}
            w={145}
            h={45}
            radius="md"
            onClick={open}
          >
            Cart
            <Image src={cart} alt="cart" pl={10} w={30} h={20} />
          </Button>
          <ModalCart
            handleClick={handleClick}
            list={list}
            opened={opened}
            close={close}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Title mb={50} order={2}>
          Catalog
        </Title>
        {loading ? (
          <Center>
            <Loader />
          </Center>
        ) : null}
        <Box className="card-list">
          {data.map((el) => (
            <CardShop handleClick={handleClick} key={el.id} data={el} />
          ))}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
