import { useAuthenticator } from '@aws-amplify/ui-react';
import TopBar from "./components/TopBar";

import './layout.css'

function App() {
  const {user, signOut} = useAuthenticator();
 
  return (
    <main>
      <div className="layout-container">
        <TopBar user = {user} signOut = {signOut} />
      </div>
    </main>
  );
}

export default App;
