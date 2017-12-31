import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import Video from './player/Video';
import Screenshot from './player/Screenshot';
import Whiteboard from './player/Whiteboard';

const Home = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-12"><Video /></div>
    </div>
    <div className="row">
      <div className="col-sm-6"><Screenshot /></div>
      <div className="col-sm-6"><Whiteboard /></div>
    </div>
  </div>
);

export default Home;