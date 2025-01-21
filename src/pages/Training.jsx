import TrainingComponent from "../components/Training";
import PrivateRoute from "../components/PrivateRoute";

function Training() {
  return (
    <PrivateRoute>
      <div>
        <TrainingComponent />
      </div>
    </PrivateRoute>
  );
}

export default Training;
