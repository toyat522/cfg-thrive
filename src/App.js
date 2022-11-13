import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Questions from './Questions'
import Stats from './Stats'
import Confirmation from './Confirmation'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/questions' element={<Questions />} />
				<Route path='/confirm' element={<Confirmation />} />
				<Route path='/stats' element={<Stats />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
