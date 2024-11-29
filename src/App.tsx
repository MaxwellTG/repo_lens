import { RepoContextProvider } from './context/RepoContext'
import Form from './components/Form'
import Table from './components/Table'
import './App.css'

function App() {
    return (
        <RepoContextProvider>
            <Form />
            <Table />
        </RepoContextProvider>
    )
}

export default App
