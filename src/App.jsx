import React, { useState, useEffect } from 'react';
import history from 'history/browser';

import './App.css';

function BlankComp() {
  return null;
}

function Link({ to, ...restProps }) {
  function handleClick(event) {
    event.preventDefault();
    history.push(to);
  }

  return <a {...restProps} href={to} onClick={handleClick}></a>;
}

function App() {
  const [stateModule, setModule] = useState('/home');
  const [stateLoader, setLoader] = useState('loading');
  const [stateData, setData] = useState({});
  const [StateComp, setComp] = useState(BlankComp);

  useEffect(() => {
    async function effect() {
      setLoader('loading');
      const module1 = await import(`./pages${stateModule}/loader.js`);
      const module2 = await import(`./pages${stateModule}/page.jsx`);
      const loaderData = await module1.loader();
      setData(loaderData);
      setComp(() => module2.default);
      setLoader('done');
    }

    effect();
  }, [stateModule]);

  useEffect(() => {
    let unlisten = history.listen(({ location, action }) => {
      console.log(action, location.pathname, location.state);
      setModule(location.pathname);
    });

    return unlisten;
  });

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/home" className="link">
          Home Page
        </Link>
        <Link to="/about" className="link">
          About Page
        </Link>
        <Link to="/pricing" className="link">
          Pricing Page
        </Link>
        <p>Content outside routing</p>
      </header>
      <main>{stateLoader === 'done' && <StateComp routeData={stateData} />}</main>
    </div>
  );
}

export default App;
