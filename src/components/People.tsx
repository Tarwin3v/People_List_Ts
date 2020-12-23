import React, { useState, useEffect } from "react";
import { Someone } from "../queries";

interface Props {
  someone: Someone;
  select: (id: number) => void;
  refresh: boolean;
}

const People: React.FC<Props> = ({ someone, select, refresh }) => {
  const [selected, setSelected] = useState(false);

  // used as observer for parent component re render event
  useEffect(() => {
    setSelected(false);
  }, [refresh]);

  // by the usage of select we trigger a parent function & share with it the data needed to work properly
  const handleClick = () => {
    select(someone.id);
    setSelected(!selected);
  };

  return (
    <div
      onClick={handleClick}
      className="people_row"
      style={{ opacity: selected ? 0.2 : 1 }}
    >
      <p>{someone.first_name}</p>
    </div>
  );
};

export default People;
