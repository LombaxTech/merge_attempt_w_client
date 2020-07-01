import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './core/Home';
// import Navbar from './core/Navbar';
import Navbar from './styledCore/Navbar';
import Signin from './core/Signin';
import Tutors from './core/Tutors';
import TutorPage from './core/TutorPage';
import Inbox from './core/Inbox';
import Chat from './core/Chat';
import Bookings from './core/Bookings';

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/tutors" exact component={Tutors} />
      <Route path="/tutor/page/:tutorId" exact component={TutorPage} />
      <Route path="/inbox" exact component={Inbox} />
      <Route path="/messages/:studentId/:tutorId" exact component={Chat} />
      <Route path="/bookings" exact component={Bookings} />
    </Switch>
  </Router>
)

export default App;
