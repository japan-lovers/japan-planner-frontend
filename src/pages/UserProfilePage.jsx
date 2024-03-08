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
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex justify-center">
      {user === null ? (
        <span className="loading loading-ring loading-lg mt-48"></span>
      ) : (
        <UserProfile user={user} id={id} />
      )}
    </div>
  );
}

export default UserProfilePage;
