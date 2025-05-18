import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect, useState } from "react";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
        } catch (err) {
            console.error(err);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;

    if (requests.length === 0) return <h1 className="flex justify-center my-16">No New Requests...</h1>

    return (
        <div className="my-18 text-center">
            <h1 className="text-white text-2xl">Requests</h1>

            
                {requests.map((request) => {
                const {_id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                    return (
                        <div key={_id} className="p-4 my-4 mx-auto bg-base-300 flex justify-between items-center w-2/3 rounded-lg">
                            <img alt="photo" className="w-20 h-20 rounded-full " src={photoUrl} />
                            <div className="mx-4 my-4 text-left">
                                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                                {age && gender && <p>{age + ", " + gender}</p>}
                                <p>{about}</p>
                            </div>
                            <div>
                                <button className="btn btn-soft btn-secondary m-2" onClick={()=>reviewRequest("rejected", request._id)}>Reject</button>
                                <button className="btn btn-soft btn-accent m-2" onClick={()=>reviewRequest("accepted", request._id)}>Accept</button>
                            </div>
                        </div>
                    );
            })}
            
        </div>
    );
};

export default Requests;