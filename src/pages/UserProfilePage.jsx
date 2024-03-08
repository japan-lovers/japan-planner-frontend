import { useParams } from "react-router-dom";
import userService from "../services/user.service";
import { useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";

function UserProfilePage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  const getUser = () => {
    userService
      .getUser(id)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {user === null ? <div>Loading...</div> : <UserProfile user={user} />}
    </div>
  );
}

export default UserProfilePage;
