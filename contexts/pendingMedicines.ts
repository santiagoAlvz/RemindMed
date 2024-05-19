import { createContext } from "react";
import { Medicine } from "@/constants/Models";

const PendingMedicinesContext = createContext<Medicine []>([]);

export default PendingMedicinesContext;