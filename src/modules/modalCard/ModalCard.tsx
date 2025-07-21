import {
  Card,
  Image,
  Group,
  Text,
  Stack,
  ActionIcon,
} from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import type { Vegetable } from '../../App';

interface ModalCardProps {
  list: Vegetable;
  handleClick: (card: Vegetable, value: number) => void;
}

export const ModalCard: React.FC<ModalCardProps> = ({ list, handleClick }) => {
  const handleIncrement = () => handleClick(list, list.quantity + 1);
  const handleDecrement = () => handleClick(list, Math.max(1, list.quantity - 1));

  return (
    <Card>
      <Group align="flex-end" justify="space-between">
        <Group>
          <Image src={list.image} w={65} h={65} />
          <Stack>
            <Group>
              <Text>{list.name.split('-')[0]}</Text>
              <Text c="gray">{list.name.split('-')[1]}</Text>
            </Group>
            <Text>&#36; {list.price * list.quantity}</Text>
          </Stack>
        </Group>
        <Group gap={0}>
          <ActionIcon
            variant="filled"
            color="#DEE2E6"
            size="md"
            radius="md"
            onClick={handleDecrement}
          >
            <IconMinus color="black" />
          </ActionIcon>
          <ActionIcon.GroupSection
            variant="transparent"
            color="black"
            size="md"
            miw={30}
          >
            {list.quantity}
          </ActionIcon.GroupSection>
          <ActionIcon
            variant="filled"
            size="md"
            color="#DEE2E6"
            radius="md"
            onClick={handleIncrement}
          >
            <IconPlus color="black" />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
};
