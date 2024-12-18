import useSWR, { mutate } from 'swr';
import { Box, Table } from '@mantine/core';
import './App.css'
import AddTodo from '../components/AddTodo';

export const API_ENDPOINT = "http://127.0.0.1:3000"

const fetcher = (url: string) => fetch(`${API_ENDPOINT}/${url}`).then((res) => res.json());

function App() {
  const { data } = useSWR('api/todos', fetcher);

  return (
    // Copilot Auto generated start
    <Box>
      <Table>
        <thead>
          <tr>
            <th>Done</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((todo: { id: number, title: string, done: boolean, body: string }) => (
            <tr key={todo.id}>
              <td>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={async () => {
                    await fetch(`${API_ENDPOINT}/api/todos/${todo.id}/done`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ done: !todo.done }),
                    });
                    mutate('api/todos');
                  }}
                />
              </td>
              <td>{todo.title}</td>
              <td>{todo.body}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddTodo />
    </Box>
    // Copilot Auto generated end
  );
}

export default App;
