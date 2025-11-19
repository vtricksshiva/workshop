import React from 'react';

// Header component receives 'title' as a prop
function Header(props) {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}

export default Header;
