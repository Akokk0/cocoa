import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

function App() {

  const nav = useNavigate()

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button onClick={() => nav('/login')}>Shadcn</Button>
    </div>
  );
}

export default App;
