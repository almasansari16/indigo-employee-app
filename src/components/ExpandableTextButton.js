import React, { useState } from 'react';

// Create a reusable Read More/Less component
const ExpandableTextButton = ({ children, descriptionLength }) => {
  const fullText = children;

  // Set the initial state of the text to be collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // This function is called when the read more/less button is clicked
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {isExpanded ? (
        <>
          {fullText}
          <button onClick={toggleText}>Show less</button>
        </>
      ) : (
        <>
          {`${fullText.slice(0, descriptionLength)}...`}
          <button onClick={toggleText}>Show more</button>
        </>
      )}
    </>
  );
};

export default ExpandableTextButton;


