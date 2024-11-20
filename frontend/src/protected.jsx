import { Navigate } from "react-router-dom"
import { useAuth } from "./authcontext"

const Protectedroute=({children})=>{
const{isauthenticated}=useAuth()
if(!isauthenticated){
    return <Navigate to ="/login"/>
}
return children
};
export default Protectedroute;