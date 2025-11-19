import React from 'react';

// Footer component receives 'tagline' as a prop
function Footer(props) {
  return (
    <footer>
      <p>{props.tagline}</p>
    </footer>
  );
}

export default Footer;
