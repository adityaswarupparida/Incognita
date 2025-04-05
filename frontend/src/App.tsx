import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { Chat } from './components/Chat'
import { VideoPreview } from './components/VideoPreview'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home/>}></Route>
				<Route path='/chat/:roomId' element={<Chat roomId='765FT9' userId='Rony' />}></Route>
				<Route path='/video/:roomId' element={<VideoPreview />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
