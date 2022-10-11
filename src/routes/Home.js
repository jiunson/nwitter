import { async } from "@firebase/util";
import { dbService } from "fbase";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
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
        getNweets();
    }, []);

    // Nweet 등록 
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                nweet,
                createdAt: Date.now(),
            });
            console.log("Document writen with ID : ", docRef.id);
            setNweet("");
        } catch(e) {
            console.error("Error : ", e);
        }
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };
    console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's on your mind?" value={nweet} maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;