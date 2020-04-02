import React from 'react';

function BasicLayout(props) {
  return (
    <div className="BasicLayout">
      { props.children }
    </div>
  );
}

export default BasicLayout;