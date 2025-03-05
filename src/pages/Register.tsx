import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../types/apiTypes';

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  password: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    fullName: '',
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':'\\|,.<>/?]/.test(password);
    return {
      valid: minLength && hasUpperCase && hasSpecialChar,
      messages: [
        !minLength && 'Не менее 8 символов',
        !hasUpperCase && 'Хотя бы одна заглавная буква',
        !hasSpecialChar && 'Хотя бы один спецсимвол',
      ].filter(Boolean),
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = '';
    if (name === 'email' && value && !validateEmail(value)) {
      error = 'Некорректный email';
    }
    if (name === 'password' && value) {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.valid) {
        error = passwordValidation.messages.join(', ');
      }
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError('');

    try {
      if (!formData.fullName || !formData.email || !formData.password) {
        throw new Error('Все поля обязательны для заполнения');
      }

      const response = await axios.post<{ token: string }>('/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      login(response.data.token);
      navigate('/');
    } catch (err) {
      const apiError = err as ApiError;
      setServerError(apiError.message || 'Ошибка регистрации');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.password &&
    !errors.email &&
    !errors.password;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Регистрация</h1>

      {serverError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-xl">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="fullName"
            placeholder="ФИО"
            value={formData.fullName}
            onChange={handleChange}
            className="border border-solid focus-visible:border-neutral-500 outline-none px-4 py-2 w-full rounded-xl"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="new-email"
            className={`border border-solid focus-visible:border-neutral-500 outline-none px-4 py-2 w-full rounded-xl ${
              errors.email ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className={`border border-solid focus-visible:border-neutral-500 outline-none px-4 py-2 w-full rounded-xl ${
              errors.password ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="bg-neutral-500 hover:bg-neutral-700 text-white px-4 py-2 w-full rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="mt-4 text-center text-neutral-500">
        У вас есть учетная запись?{' '}
        <Link to="/login" className="hover:text-neutral-800 hover:underline">
          Войти
        </Link>
      </div>
    </div>
  );
}
