import React from "react";

const Points = ({pointsPlayOne, pointsPlayTwo}) => 
<div className="points">
  <div className="point first">
    Play One: {pointsPlayOne}
  </div>
  |
  <div className="point last">
    Play Two: {pointsPlayTwo}
  </div>
</div>;

export default Points;