import { FormEvent, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from '../api/axios';
import { useAuth } from '../hooks/useAuth';

interface Credentials {
  email: string;
  password: string;
}

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!emailRef.current || !passwordRef.current) {
      setError('Поля email и пароль должны быть заполнены');
      setIsLoading(false);
      return;
    }

    try {
      const credentials: Credentials = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      const response = await axios.post('/auth', credentials);
      login(response.data.token);

      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Авторизация</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
          autoComplete="email"
          className="block mb-4 border border-solid focus-visible:border-neutral-500 outline-none px-4 py-2 w-full rounded-xl"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          ref={passwordRef}
          autoComplete="current-password"
          className="block mb-4 border border-solid focus-visible:border-neutral-500 outline-none px-4 py-2 w-full rounded-xl"
          required
        />

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-neutral-500 hover:bg-neutral-700 text-white px-4 py-2 w-full rounded-xl transition disabled:opacity-50"
        >
          {isLoading ? 'Выполняется вход...' : 'Войти'}
        </button>
      </form>

      <div className="mt-4 text-center text-neutral-500">
        У вас нет учетной записи?{' '}
        <Link
          to={'/register'}
          className="hover:text-neutral-800 hover:underline"
        >
          Зарегистрироваться
        </Link>
      </div>
    </>
  );
}
