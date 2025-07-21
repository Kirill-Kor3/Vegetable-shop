import { ModalCard } from '../modalCard/ModalCard';
import { Modal, Group, Text } from '@mantine/core';
import type { Vegetable } from '../../App';

interface ModalCartProps {
  opened: boolean;
  close: () => void;
  list: Vegetable[];
  handleClick: (card: Vegetable, value: number) => void;
}

export const ModalCart: React.FC<ModalCartProps> = ({ opened, close, list, handleClick }) => {
  const total = list.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Modal
      styles={{
        content: {
          backgroundColor: '#fff',
        },
      }}
      radius={10}
      withCloseButton={false}
      opened={opened}
      onClose={close}
    >
      {list.length === 0 ? (
        <Text>Cart is empty</Text>
      ) : (
        <>
          {list.map((el) => (
            <ModalCard handleClick={handleClick} key={el.id} list={el} />
          ))}
          <Group mt="md" justify="space-between">
            <Text fw={600}>Total</Text>
            <Text>${total}</Text>
          </Group>
        </>
      )}
    </Modal>
  );
};
