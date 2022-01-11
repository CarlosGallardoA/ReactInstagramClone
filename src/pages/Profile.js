import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import UserProfile from "../components/Profile";
import Header from "../components/Header";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
        setUserExists(true);
      } else {
        setUserExists(false);
        navigate(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, navigate]);
  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

export default Profile;
