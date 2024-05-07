import { task } from "@/models/Task";
import { useMemo } from "react";

const useSearch = (list: task[] | undefined, debounceV: string | null) => {
  const filtered = useMemo(() => {
    return debounceV
      ? list?.filter((x) =>
          x.title.toLocaleLowerCase().includes(debounceV.toLocaleLowerCase())
        )
      : list;
  }, [debounceV, list]);
  return filtered;
};
export default useSearch;
