import { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({password,email})
  };

  return (
    <>
      <div className="sign popup__container">
        <h2 className="sign__title popup__container-title">Вход</h2>
        <form
          name="type-form"
          className="popup__form"
          noValidate=""
          onSubmit={handleSubmit}
        >
          <input
            className="sign__input popup__input popup__input_type_name"
            placeholder="Email"
            type="email"
            required=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="sign__span popup__input-error username-error" />
          <input
            className="sign__input popup__input popup__input_type_job"
            placeholder="Password"
            type="password"
            required=""
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="popup__input-error input-job-error" />
          <button
            type="submit"
            className="sign__button popup__container-submit"
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
