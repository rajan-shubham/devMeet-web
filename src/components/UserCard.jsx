const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user;
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img className="my-2 h-72 w-auto"
                    src={photoUrl}
                    alt="User Profile Pic" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-between">
                    <button className="btn btn-soft btn-secondary">Ignore</button>
                    <button className="btn btn-soft btn-accent">Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;