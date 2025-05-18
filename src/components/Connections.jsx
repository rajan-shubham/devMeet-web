import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true, });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;

    if (connections.length === 0) return <h1 className="my-20 flex justify-center">No Connections Found</h1>

    return (
        <div className="my-18 text-center">
            <h1 className="text-white text-2xl">Connections</h1>

            
                {connections.map((connection) => {
                const {_id, firstName, lastName, photoUrl, age, gender, about } = connection;

                return (
                    <div key={_id} className="p-4 my-4 mx-auto bg-base-300 flex w-1/2 rounded-lg">
                        <img alt="photo" className="w-20 h-20 rounded-full " src={photoUrl} />
                        <div className="mx-4 my-4 text-left">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )
            })}
            
        </div>
    );
};

export default Connections;