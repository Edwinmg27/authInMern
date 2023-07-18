import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './style.module.css';

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	})
	const [error, setError] = useState("")
	const navigate = useNavigate();

	const handleChange = ({currentTarget: input}) => {
		setData({...data,[input.name]: input.value})
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/v1/users";
			const {data:res} = await axios.post(url, data);
			navigate("/login")
		} catch (error) {
			if(error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
				){
					setError(error.response.data.message)
				}
			}
	}

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Bienvenido</h1>
					<Link to="/login">
						<button type='button' className={styles.white_btn}>
							Iniciar sesión
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Crear cuenta</h1>
						<input
							type="text"
							placeholder='Ingresa un nombre'
							name='firstName'
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder='Ingresa un apellido'
							name='lastName'
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder='Email'
							name='email'
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder='Ingresa tu clave'
							name='password'
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{ error && <div className={styles.error_msg}>{error}</div>}
						<button type='submit' className={styles.green_btn}>
							Registrarse
						</button>
					</form>
				</div>
			</div>
		</div>
	)
};

export default Signup;