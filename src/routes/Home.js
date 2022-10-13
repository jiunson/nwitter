import { async } from "@firebase/util";
import { v4 as uuidv4 } from "uuid";
import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);   // array
    useEffect(() => {
        // onSnapshot 이벤트를 이용한 실시간 조회 
        const q = query(collection(dbService, "nweets"), orderBy("createdAt","desc"));
        const unsub = onSnapshot(q, (snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
            setNweets(nweetArray);
        });
    }, []);
    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;