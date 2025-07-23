import React, { useState } from "react";
import NewCapsule from "./NewCapsule/NewCapsule";
const AddCapsule = () => {
  const [showAddCapsule, setAddCapsule] = useState(false);

  return (
    <div>
      <button
        className="add-btn"
        onClick={() => setAddCapsule((state) => !state)}
      >
        +
      </button>

      {showAddCapsule && <NewCapsule />}
    </div>
  );
};

export default AddCapsule;
