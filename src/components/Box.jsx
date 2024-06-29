import { useState } from "react";
import PropTypes from "prop-types";

export function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
};
