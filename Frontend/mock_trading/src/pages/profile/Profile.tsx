import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchUser } from "../../methods/ProfileMethods";

interface User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}
function Profile() {
  const location = useLocation();
  const email = location.state.email;
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {

    if (email) {
      fetchUser(email, setUser);
    }
  }, [email]);
  return (
    <div>

      <div className="min-h-screen flex flex-col justify-center items-center">

        <div className="container mx-auto bg-red-50 p-4 rounded-lg shadow-lg">
          {user && (
            <div>
              <p>Email: {user.email}</p>
              <p>First Name: {user.firstname}</p>
              <p>Last Name: {user.lastname}</p>
              <p>Username: {user.username}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
