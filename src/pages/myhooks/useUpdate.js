import { useReducer } from "react";

const useUpdate = () => {
  const [_, update] = useReducer((num) => num + 1, 0);
  return update;
};

export default useUpdate;
