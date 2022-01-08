import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";
const User = ({ username, fullName }) => {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 pa-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
      </div>
      <div className="col-span-3 ml-2">
        <p className="font-bold text-sm">{username}</p>
        <p className="txt-sm">{fullName}</p>
      </div>
    </Link>
  );
};
export default User;
User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
