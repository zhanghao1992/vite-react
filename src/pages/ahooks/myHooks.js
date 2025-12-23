import { useRequest } from "ahooks";

const useMyRequest = (service, ops) => {
  return useRequest(service, {
    manual: true,
    ...ops,
  });
};
export { useMyRequest };
