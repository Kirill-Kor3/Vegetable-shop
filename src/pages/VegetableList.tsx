import { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import cart from '../assets/cart.svg';
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
  Badge,
} from '@mantine/core';
import { ModalCart } from '../modules/modalCart/ModalCart';
import { CardShop } from '../modules/CardShop/CardShop';
import { fetchVegetable } from '../hooks/VegetableThunks';
import type { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export interface Vegetable {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  currentPrice: number;
}

const VegetableList = () => {
  const dispatch = useDispatch();
  const { vegetables, loading, vegetablesCart } = useSelector(
    (state: RootState) => state.vegetable
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [list, setList] = useState<Vegetable[]>([]);

  useEffect(() => {
    dispatch(fetchVegetable());
  }, [dispatch]);

  function handleClick(card: Vegetable, value: number) {
    setList((prev: Vegetable[]) => {
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
            w={175}
            h={45}
            radius="md"
            onClick={open}
          >
            {vegetablesCart.length !== 0 && (
              <Badge mr={10} c="#000" size="md" circle color="#fff">
                {vegetablesCart.length}
              </Badge>
            )}
            Cart
            <Image src={cart} alt="cart" pl={10} w={30} h={20} />
          </Button>
          <ModalCart
            handleClick={handleClick}
            list={vegetablesCart}
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
          {vegetables.map((el: Vegetable) => (
            <CardShop key={el.id} data={el} />
          ))}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default VegetableList;
