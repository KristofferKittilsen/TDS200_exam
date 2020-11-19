import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import React from 'react';
import { NhostApolloProvider, NhostAuthProvider } from 'react-nhost';
import { Redirect, Route } from 'react-router-dom';
import configData from "./config.json";
import FrontPage from './pages/FrontPage';
import Home from './pages/Home';
import Login from './pages/Login';
import NewTrip from './pages/NewTrip';
import ProfilePage from './pages/ProfilePage';
import Signup from './pages/Signup';
import TripDetailPage from './pages/TripDetailPage';
/* Theme variables */
import './theme/variables.css';
import { auth } from './utils/nhost';
import PrivateRoute from './components/PrivateRoute';
import MapPage from './pages/MapPage';
import FollowingPage from './pages/FollwingPage';
import UserFollowers from './pages/UserFollowers';
import UserFollowing from './pages/UserFollowing';

const App: React.FC = () => (

  //Inspired by lectures aswell as nhost docs

  <NhostAuthProvider auth={auth}>
    <NhostApolloProvider auth={auth} gqlEndpoint={configData.ENDPOINT}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/frontpage" component={FrontPage} exact={true} />
            <Route path="/home" component={Home} exact={true} />
            <PrivateRoute path="/following" component={FollowingPage} exact={true} />
            <PrivateRoute path="/userfollowers" component={UserFollowers} exact={true} />
            <PrivateRoute path="/userfollowing" component={UserFollowing} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/signup" component={Signup} exact={true} />
            <PrivateRoute path="/map" component={MapPage} exact={true} />
            <PrivateRoute path="/profile/:id" component={ProfilePage} exact={true} />
            <PrivateRoute path="/newTrip" component={NewTrip} exact={true} />
            <PrivateRoute path="/tripdetails/:id" component={TripDetailPage} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/frontpage" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </NhostApolloProvider>
  </NhostAuthProvider>

);

export default App;
