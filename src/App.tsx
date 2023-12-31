import "./post.css"
import "./App.css"
import Main from "./components/Main"
import { Provider } from "jotai"

function App() {
  return (
    <Provider>
      <Main lang="ja"></Main>
    </Provider>
  )
}

export default App
