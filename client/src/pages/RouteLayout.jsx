import { useParams } from "react-router-dom";
import Movie from "./Movie";
import List from "./List";

export default function RouteLayout() {
  const {type , param2} = useParams();

  if (type !== "person" && !isNaN(Number(param2)) && isFinite(param2)){
    return <Movie />
  } else {
    return <List/>
  }
}
