import { useAuthenticator } from '@aws-amplify/ui-react';
import TopBar from "./components/TopBar";
import Draggable from 'react-draggable';
import './layout.css'
import createBlock from './components/Block';

function App() {
  const {user, signOut} = useAuthenticator();
 
  return (
    <main>
      <div className="layout-container">
        <TopBar user = {user} signOut = {signOut} />
        <Draggable>
          <div>
            {createBlock()}
          </div>
        </Draggable>
      </div>
    </main>
  );
}

export default App;
