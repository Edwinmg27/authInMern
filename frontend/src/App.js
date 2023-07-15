import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
import Orb from './components/Orb/Orb'
import Navigation from './components/Navigation/Navigation'
import Dashboard from './components/Dashboard/Dashboard'
import Income from './components/Income/Income'
import Expenses from './components/Expenses/Expenses'
import { useGlobalContext } from './context/globalContext'
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
	const [active] = useState(1)
	const { user, getUser } = useGlobalContext()

	const token = localStorage.getItem("token")

	useEffect(() => {
		getUser(token);
	  }, [token])

	const orbMemo = useMemo(() => {
	  return <Orb />
	}, [])

  return (
	<Routes>
		{token && <Route path="/" exact element={
			<AppStyled bg={bg} className='App'>
				{orbMemo}
				<MainLayout>
					<Navigation active={active} user={user} />
					<main>
						<Dashboard />
					</main>
				</MainLayout>
			</AppStyled>
		} />}
		{token && <Route path="/income" exact element={
			<AppStyled bg={bg} className='App'>
				{orbMemo}
				<MainLayout>
					<Navigation active={active} user={user} />
					<main>
						<Income />
					</main>
				</MainLayout>
			</AppStyled>
		} />}
		{token && <Route path="/expenses" exact element={
			<AppStyled bg={bg} className='App'>
				{orbMemo}
				<MainLayout>
					<Navigation active={active} user={user} />
					<main>
						<Expenses />
					</main>
				</MainLayout>
			</AppStyled>
		} />}
		{<Route path="/signup" exact element={<Signup/>} />}
		{<Route path="/login" exact element={<Login/>} />}
		{<Route path="/" exact element={<Navigate replace to="/login"/>} />}
	</Routes>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`

export default App;
