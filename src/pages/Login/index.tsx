import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaLockOpen } from 'react-icons/fa'; 
import styles from './index.module.css'; 

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false); 

 
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };
  
  const getPasswordValidation = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar, 
    };
  };

  const isFormValid = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = getPasswordValidation(password).isValid;
    return isEmailValid && isPasswordValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    const passwordValidation = getPasswordValidation(password);
    if (!passwordValidation.isValid) {
      setError('A senha não atende a todos os critérios de segurança.');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);

    setEmail('');
    setPassword('');
    setError('');
  };

  const passwordValidation = getPasswordValidation(password);

  return (
    <div className={styles.telaLogin}>
      <div className={styles.container}>
        <h2>Login</h2>
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
                {showPassword ? <FaLockOpen /> : <FaLock />} 
              </div>
            </div>

            {password && !passwordValidation.isValid && (
              <div className={styles.passwordValidation}>
                <p style={{ color: passwordValidation.minLength ? 'green' : 'red' }}>
                  • Mínimo 8 caracteres
                </p>
                <p style={{ color: passwordValidation.hasUpperCase ? 'green' : 'red' }}>
                  • Pelo menos uma letra maiúscula
                </p>
                <p style={{ color: passwordValidation.hasLowerCase ? 'green' : 'red' }}>
                  • Pelo menos uma letra minúscula
                </p>
                <p style={{ color: passwordValidation.hasNumber ? 'green' : 'red' }}>
                  • Pelo menos um número
                </p>
                <p style={{ color: passwordValidation.hasSpecialChar ? 'green' : 'red' }}>
                  • Pelo menos um caractere especial
                </p>
              </div>
            )}
          </div>
          <button
            type="submit"
            className={isFormValid() ? styles.button : styles.buttonDisabled}
            disabled={!isFormValid()} 
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}