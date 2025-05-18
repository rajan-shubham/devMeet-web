import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    
    const {_id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img className="my-2 h-72 w-auto" src={photoUrl} alt="User Profile Pic" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-between">
                    <button className="btn btn-soft btn-secondary" onClick={() => { handleSendRequest("ignored", _id); }}>Ignore</button>
                    <button className="btn btn-soft btn-accent" onClick={() => {handleSendRequest("interested", _id);}}>Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;