import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SearchTasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set("q", value);
    } else {
      newSearchParams.delete("q");
    }
    setSearchParams(newSearchParams, { replace: true });
  };
  return (
    <div className="p-4 m-4 gap-2 sm:mt-16 mt-20 flex flex-col sm:w-3/6  sm:self-center  ">
      <Input
        value={q}
        type="search"
        placeholder="Busca una tarea"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchTasks;
