import React from 'react';

export default function Header() {
  const appName = process.env.REACT_APP_NAME;
  return (
    <header className="Header">
      <h1>{appName}</h1>
    </header>
  );
}
