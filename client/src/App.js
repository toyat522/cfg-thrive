import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Questions from './Questions'
import Stats from './Stats'
import Login from './Login'
import Confirmation from './Confirmation'

// Create webpages according to their paths
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/questions' element={<Questions />} />
				<Route path='/confirm' element={<Confirmation />} />
				<Route path='/stats' element={<Stats />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
