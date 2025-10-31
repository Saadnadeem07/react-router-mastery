import React from "react";
import ReactRouterv6 from "./Routing/ReactRouterv6";
import ReactRouterv7 from "./Routing/ReactRouterv7";
const App = () => {
  return (
    <>
      {/* use any one at a time react router v6 ir v7 */}
      {/* <ReactRouterv6 /> */}
      <ReactRouterv7 />
    </>
  );
};

export default App;
