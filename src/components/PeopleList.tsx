import React, { useState } from "react";
import People from "./People";
import { useQuery, useMutation } from "react-query";
import { getPeopleList, deleteSomeone, Someone } from "../queries";

const PeopleList: React.FC = () => {
  const [ids, setIds] = useState<number[]>([]);
  const { data, refetch } = useQuery("people", getPeopleList);
  const [refresh, setRefresh] = useState(false);

  // When we mutate our data successfully we want to refetch data from db
  // & clear our Ids array
  // & emit an event to share our re render state with out child component

  const { mutate } = useMutation(deleteSomeone, {
    onSuccess: () => {
      refetch();
      setIds([]);
      setRefresh(!refresh);
    },
  });

  const displayPeople = () => {
    return data?.map((p: Someone, i: number) => (
      <People key={i} someone={p} select={setSelected} refresh={refresh} />
    ));
  };

  // this function is shared with our child component who will send us back id to work with
  // if id is already present in our ids Array we remove it from
  // else we push it

  const setSelected = (id: number) => {
    const idArr = [...ids];
    if (!idArr.includes(id)) {
      idArr.push(id);
    } else {
      idArr.splice(idArr.indexOf(id), 1);
    }
    setIds(idArr);
  };

  const deletePeople = async () => {
    ids.forEach((id) => {
      try {
        mutate(id);
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <>
      <button className="delete_button" onClick={deletePeople}>
        Delete
      </button>
      {data && displayPeople()}
    </>
  );
};

export default PeopleList;
