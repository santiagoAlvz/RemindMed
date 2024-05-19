import { createContext } from "react";
import { Medicine } from "@/constants/Models";

const PendingMedicinesContext = createContext({
    pendingMedicines: [],
    setPendingMedicines: () => {}
});

export default PendingMedicinesContext;