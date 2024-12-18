// Copilot Auto generated start
import { useState } from 'react';
import { Box, Button, TextInput, Group } from '@mantine/core';
import useSWR, { mutate } from 'swr';
import { API_ENDPOINT } from '../src/App';
import React from 'react';

const AddTodo = () => {
    const [todo, setTodo] = useState('');
    const [todoBody, setTodoBody] = useState('');

    const handleAddTodo = async () => {
        if (todo.trim() === '') return;

        const newTodo = { title: todo, done: false, body: todoBody };

        await fetch(`${API_ENDPOINT}/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        });

        mutate('api/todos');
        setTodo('');
        setTodoBody('');
    };

    return (
        <Box style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', marginTop: '20px' }}>
            <Group direction="column" spacing="sm">
                <TextInput
                    value={todo}
                    onChange={(e) => setTodo(e.currentTarget.value)}
                    placeholder="Add a new todo"
                    label="Title"
                    required
                />
                <TextInput
                    value={todoBody}
                    onChange={(e) => setTodoBody(e.currentTarget.value)}
                    placeholder="Add a todo body"
                    label="Body"
                    required
                />
                <Button onClick={handleAddTodo} style={{ marginTop: '10px' }}>Add Todo</Button>
            </Group>
        </Box>
    );
};

export default AddTodo;
// Copilot Auto generated end