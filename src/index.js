import _, { functions } from "lodash";
import modal from "./modules/modal";
import switchdirectory from "./modules/switchdirectory";
import { compareAsc, format } from "date-fns";
import { myLibrary } from "./modules/modalPopulate";
import { pushAllItemstoDom } from "./modules/domManipulation";
import { newProjectButton } from "./modules/newProjectButton";

modal();
switchdirectory();
pushAllItemstoDom();
newProjectButton();
