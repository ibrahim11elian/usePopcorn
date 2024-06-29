import { useState } from "react";
import PropTypes from "prop-types";

function TextExpander({
  children,
  collapsedNumWords = 20,
  expandButtonText = "Show More",
  collapseButtonText = "Show Less",
  buttonColor = "blue",
  expanded = false,
  className = "",
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const text = isExpanded
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  const handleExpandText = () => setIsExpanded((prevState) => !prevState);

  const textStyle = {
    cursor: "pointer",
    color: buttonColor,
  };
  return (
    <div className={className}>
      {text}{" "}
      <span role="button" style={textStyle} onClick={handleExpandText}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </span>
    </div>
  );
}

TextExpander.propTypes = {
  children: PropTypes.string.isRequired,
  collapsedNumWords: PropTypes.number,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
};

export default TextExpander;
