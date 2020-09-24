import React from 'react';

function Comp(props) {
  console.log(props);
  return (
    <div className="Comp">
      <blockquote>
        Pricing is free
      </blockquote>
      <h1>
        Price page
      </h1>
    </div>
  );
}

export default Comp;
