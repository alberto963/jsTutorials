import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// This container and app-root are siblings in the DOM
const modalRoot = document.getElementById('modal-root');

const Modal = (props) => {
  const el = document.createElement('div');

  useEffect(() => {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(el);

    return () => modalRoot.removeChild(el);
  })

  return ReactDOM.createPortal(
    props.children,
    el
  );
}

const Parent = (props) => {
  const [clicks, setClicks] = useState(0)

  return (
    <div onClick={() => setClicks(clicks + 1)}>
      <p>This is a Fuctional Component</p>
      <p>Number of clicks: {clicks}</p>
      <p>
        Open up the browser DevTools
        to observe that the button
        is not a child of the div
        with the onClick handler.
        </p>
      <Modal>
        <Child />
      </Modal>
    </div>
  );
}

function Child() {
  // The click event on this button will bubble up to parent,
  // even if there is no 'onClick' attribute defined
  return (
    <div className="modal">
      <button onClick={() => console.info('Button click')}>Click</button>
    </div>
  );
}

export default Parent;
