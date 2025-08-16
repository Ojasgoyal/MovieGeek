import { useParams } from "react-router-dom";
import List from "./List";
import Detail from "./Detail";

export default function RouteLayout() {
  const {type , param2} = useParams();

  if (!isNaN(Number(param2)) && isFinite(param2)){
    return <Detail key={`${type}-${param2}`}/>
  } else {
    return <List/>
  }
}
