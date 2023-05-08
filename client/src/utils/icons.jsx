import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faPlay, faPenToSquare, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass);
library.add(faPlay);
library.add(faPenToSquare);
library.add(faDeleteLeft);

const SearchIcon = () => <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
const PlayIcon = () => <FontAwesomeIcon icon="fa-solid fa-play" />
const EditIcon = () => <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
const DeleteIcon = () => <FontAwesomeIcon icon="fa-solid fa-delete-left" />

export { 
    SearchIcon, PlayIcon, EditIcon, DeleteIcon
}