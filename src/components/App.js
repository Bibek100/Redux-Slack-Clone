import React from "react";
import { Grid } from "semantic-ui-css";

import "./App.css";

const App = () => (
  <Grid>
    <ColorPanel />
    <SidePanel />
    <Messages />
    <MetaPanel />
  </Grid>
);

export default App;
