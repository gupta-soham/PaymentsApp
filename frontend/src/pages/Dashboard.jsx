import { Navigate } from 'react-router-dom'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { UserDetails } from '../components/UserDetails'
import { Users } from '../components/Users'
import TerminalLoader from "../components/TerminalLoader";

export const Dashboard = () => {
  const user = UserDetails();
  if(user.loading) {
    return <TerminalLoader />;
  }

  if(!user.userDetails) {
      return <Navigate to={"/signin"} />
  }
  
  return (
    <div>
      
        <Appbar />

        <div className="m-8">
            <Balance value={user.userDetails.account.balance} />
            <Users />
        </div>
    </div>
  )
}
