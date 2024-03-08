function UserProfile(props) {
  const { user } = props;

  return (
    <div className="flex">
      <img
        className="rounded-full w-32 border-4 border-white shadow"
        src={user.profilePic}
        alt=""
      />
      <div>
        <h1 className="font-bold text-2xl">{user.username}</h1>
        <h2 className="font-thin text-md">{user.nationality}</h2>
      </div>

      <button className="btn btn-outline btn-xs">Edit</button>
    </div>
  );
}

export default UserProfile;
