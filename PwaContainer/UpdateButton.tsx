import { MdOutlineRefresh } from "react-icons/md";
import { usePwa } from "./context";
import classes from "./UpdateButton.module.css";

export const UpdateButton = () => {
  const { updateNeeded, performUpdate } = usePwa();

  if (!updateNeeded) {
    return null;
  }

  return (
    <button
      title="oppdater appen"
      onClick={() => performUpdate()}
      className={classes.refresh}
      style={{ order: 10 }}
    >
      <MdOutlineRefresh />
    </button>
  );
};
