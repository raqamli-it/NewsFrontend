import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Input, Button, ErrorMessage, SuccessMessage } from './styled'; // styled-components dan import

const Register = () => {
  const navigate = useNavigate();
  const [nom, setName] = useState(''); // To'liq ism
  const [parol, setPassword] = useState(''); // Parol
  const [password2, setPassword2] = useState(''); // Parolni tasdiqlash
  const [telefon, setPhone] = useState(''); // Telefon raqam
  const [loading, setLoading] = useState(false); // Yuklanish holati
  const [xato, setError] = useState(null); // Xato holati
  const [malumotlar, setData] = useState(null); // Muvaffaqiyatli ro'yxatdan o'tgan foydalanuvchi ma'lumotlari

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const javob = await fetch(`${process.env.REACT_APP_API_URL}/users/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: nom,
          password: parol,
          password2: password2,
          phone: telefon,
        }),
      });

      if (!javob.ok) {
        const errorResponse = await javob.json();
        throw new Error(errorResponse.detail || 'Registratsiyada xatolik yuz berdi');
      }

      const natija = await javob.json();
      setData(natija);

      // Foydalanuvchi nomini localStorage'ga saqlash
      localStorage.setItem('userName', nom);

      // Login sahifasiga yo'naltirish
      navigate('/login');
    } catch (err) {
      setError(err.message);
      console.error('Xatolik:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Ro'yxatdan o'tish</h2>
        <Input
          type="text"
          placeholder="To'liq ismingiz"
          value={nom}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Parol"
          value={parol}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Telefon raqamingiz"
          value={telefon}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Yuklanmoqda...' : "Ro'yxatdan o'tish"}
        </Button>
      </Form>

      {xato && <ErrorMessage>Xato: {xato}</ErrorMessage>}
      {malumotlar && <SuccessMessage>Muvaffaqiyatli ro'yxatdan o'tildi!</SuccessMessage>}
    </Container>
  );
};

export default Register;
