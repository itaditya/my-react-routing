import React from 'react';

function Comp(props) {
  const { routeData } = props;

  return (
    <div className="Comp">
      <h1>
        About page
      </h1>
      <ul>
        {routeData.names.map((name) => (
          <li key={name}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comp;
