import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Input, Button, ErrorMessage } from './styled'; // styled-components import

const Login = ({ setUser }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
        phone: phone,
        password: password,
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login muvaffaqiyatli, access token:', data.access);

            // Tokenlarni saqlash
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // Foydalanuvchi ma'lumotlarini saqlash
            const userData = {
                phone: phone,
            };
            setUser(userData); // Foydalanuvchini o'rnatish

            // Asosiy sahifaga yo'naltirish
            navigate('/');
        } else {
            setError('Login xatosi. Ma\'lumotlaringizni tekshiring.');
        }
    } catch (error) {
        console.error('Login jarayonida xato:', error);
        setError('Xato yuz berdi. Keyinroq qayta urinib ko\'ring.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <h2>Login</h2>
        <Input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefon raqami"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Parol"
          required
        />
        <Button type="submit">Login</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default Login;
