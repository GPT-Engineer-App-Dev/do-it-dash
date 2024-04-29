import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="lg"
        mb={4}
      />
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addTask}>
        Add Task
      </Button>
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center" justifyContent="space-between">
            <Box as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <Box>
              <IconButton
                icon={<FaCheckCircle />}
                onClick={() => toggleCompletion(task.id)}
                colorScheme={task.isCompleted ? 'green' : 'gray'}
                aria-label="Mark as completed"
                mr={2}
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(task.id)}
                colorScheme="red"
                aria-label="Delete task"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;