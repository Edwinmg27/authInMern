import { useState } from 'react';
import front from '../../img/front.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './style.module.css';

const Signup = () => {
	const [data, setData] = useState({
		email: "",
		password: ""
	})
	const [error, setError] = useState("");

	const handleChange = ({currentTarget: input}) => {
		setData({...data,[input.name]: input.value})
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/v1/auth";
			const {data:res} = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/"
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
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
				<form className={styles.form_container} onSubmit={handleSubmit}>
					<img src={front} alt="" className={styles.front} />
						<h1>Inicia sesión en tu cuenta</h1>
						<input
							type="email"
							placeholder='Correo'
							name='email'
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder='Contraseña'
							name='password'
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{ error && <div className={styles.error_msg}>{error}</div>}
						<button type='submit' className={styles.green_btn}>
							Ingresar
						</button>
					</form>
				</div>
				<div className={styles.right}>
				<h1>Eres nuevo?</h1>
					<Link to="/signup">
						<button type='button' className={styles.white_btn}>
							Registrarse
						</button>
					</Link>

				</div>
			</div>
		</div>
	)
};

export default Signup;