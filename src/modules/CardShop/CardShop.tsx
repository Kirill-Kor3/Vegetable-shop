import type { Vegetable } from '../../pages/VegetableList';
import { Card, Image, Group, Text, ActionIcon, Button } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { useCounter } from '@mantine/hooks';
import icon from '../../assets/icon.svg';
import './CardShop.css';
import { useDispatch } from 'react-redux';
import { addCart } from '../../store/reducers/VegetableSlice';

interface CardShopProps {
  data: Vegetable;
}

export const CardShop: React.FC<CardShopProps> = ({ data }) => {
  const [value, { increment, decrement }] = useCounter(1, { min: 1 });
  const dispatch = useDispatch()
  return (
    <Card w={300} padding={16} radius="lg">
      <Card.Section pt={5}>
        <Image miw={300} h={308} src={data.image} />
      </Card.Section>
      <Group mb={15} justify="space-between">
        <Group>
          <Text fz={18}>{data.name.split('-')[0]}</Text>
          <Text fz={14} c="gray">
            {data.name.split('-')[1]}
          </Text>
        </Group>
        <Group gap={0}>
          <ActionIcon
            variant="filled"
            color="#DEE2E6"
            size="md"
            radius="md"
            onClick={decrement}
          >
            <IconMinus color="black" />
          </ActionIcon>
          <ActionIcon.GroupSection
            variant="transparent"
            color="black"
            size="md"
            miw={30}
          >
            {value}
          </ActionIcon.GroupSection>
          <ActionIcon
            variant="filled"
            size="md"
            color="#DEE2E6"
            radius="md"
            onClick={increment}
          >
            <IconPlus color="black" />
          </ActionIcon>
        </Group>
      </Group>
      <Group justify="space-between">
        <Group gap={5}>
          {/* <IconCurrencyDollar size={20} /> */}
          &#36;
          <Text>{data.price}</Text>
        </Group>
        <Button
          miw={200}
          h={45}
          variant="filled"
          color="#D6F0DC"
          radius="md"
          className="add-button"
          onClick={() => dispatch(addCart({data, value}))}
        >
          Add to cart
          <Image src={icon} alt="cart" pl={10} w={30} h={20} />
        </Button>
      </Group>
    </Card>
  );
};
