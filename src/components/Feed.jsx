import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
            dispatch(addFeed(res.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { getFeed(); }, []);

    if (!feed) return;
    if(feed.length <= 0) return <h1 className="my-20 flex justify-center">No new user found!</h1>

    return (
        feed && (
            <div className="my-36 flex justify-center">
                <UserCard user={feed[0]} />
            </div>
        )
    );
};

export default Feed;