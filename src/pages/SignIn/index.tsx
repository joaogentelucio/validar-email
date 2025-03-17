import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa'; 
import styles from './index.module.css'; 
import logo from '@/assets/Icon.png';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false); 

  // Validação do email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

  // Validação da senha (apenas verificar se tem mais de 8 caracteres)
  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  // Validação do formulário
  const isFormValid = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    return isEmailValid && isPasswordValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um email válido.');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    try {
      const response = await fetch('https://sua-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const data = await response.json();
      console.log('Login bem-sucedido:', data);

      // Redirecionar para a dashboard ou salvar o token

    } catch (error) {
      setError('Erro ao fazer login. Por favor, tente novamente.');
      console.error('Erro:', error);
    }

    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className={styles.telaLogin}>
      <div className={styles.container}>
        <img
          src={logo}
          alt="Logo"
          className={styles.logo}
        />
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <div className={styles.inputContainer}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!validateEmail(e.target.value)) {
                    setEmailError('Por favor, insira um email válido.');
                  } else {
                    setEmailError('');
                  }
                }}
                className={styles.input}
                placeholder="Digite seu email"
              />
              <FaEnvelope className={styles.icon} />
            </div>
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha:</label>
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Digite sua senha"
              />
              <div
                className={styles.icon}
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaLock />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={isFormValid() ? styles.button : styles.buttonDisabled}
            disabled={!isFormValid()}
          >
            Entrar
          </button>
        </form>

        <div className={styles.registerLink}>
          <p>
            Não tem conta? <Link to="/SignUp" className={styles.signup}>Inscrever-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
