import { async } from "@firebase/util";
import { dbService } from "fbase";
import { addDoc, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);   // array
    // Nweets 조회
    const getNweets = async () => {
        try {
            //const docRef = doc(dbService, "nweets");
            const dbNweets = await getDocs(collection(dbService, "nweets"));
            dbNweets.forEach((doc) => {
                const nweetObject = {
                    ...doc.data(),
                    id: doc.id,
                };
                setNweets((prev) => [nweetObject, ...prev]); // [최근 doc, 이전 doc]
            });
        } catch(e) {
            console.error("Error : ", e);
        }
        
    };
    useEffect(() => {
        // Nweets 조회 -> onSnapshot()으로 대체함.
        //getNweets();

        // Nweets 실시간 조회 
        const unsub = onSnapshot(collection(dbService,"nweets"), (snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
            setNweets(nweetArray);
        });
    }, []);

    // Nweet 등록 
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
            //console.log("Document writen with ID : ", docRef.id);
            setNweet("");
        } catch(e) {
            console.error("Error : ", e);
        }
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's on your mind?" value={nweet} maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;