import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import FrontPage from './pages/FrontPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import { NhostApolloProvider, NhostAuthProvider } from 'react-nhost';
import configData from "./config.json";
import { auth } from './utils/nhost';
import NewTrip from './pages/NewTrip';
import TripDetailPage from './pages/TripDetailPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


const App: React.FC = () => (
  <NhostAuthProvider auth={auth}>
    <NhostApolloProvider auth={auth} gqlEndpoint={configData.ENDPOINT}>
      <IonApp>
        <IonReactRouter>
          <Switch>
            <Route path="/" component={FrontPage} exact={true} />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/signup" component={Signup} exact={true} />
            <Route path="/profile" component={ProfilePage} exact={true} />
            <Route path="/newTrip" component={NewTrip} exact={true} />
            <Route path="/tripDetails/:id" component={TripDetailPage} exact={true} />
          </Switch>
        </IonReactRouter>
      </IonApp>
    </NhostApolloProvider>
  </NhostAuthProvider>

);

export default App;
