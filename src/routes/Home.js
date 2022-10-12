import { async } from "@firebase/util";
import { v4 as uuidv4 } from "uuid";
import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import { addDoc, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);   // array
    const [attachment, setAttachment] = useState("");
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

        // onSnapshot 이벤트를 이용한 실시간 조회 
        const unsub = onSnapshot(collection(dbService,"nweets"), (snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        // Upload Attachment
        let attachmentUrl;
        if(attachment != "") {
            // 파일 업로드를 수행하기 위해 작업할 파일을 가리키는 참조.
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            // Upload file
            const response = await uploadString(fileRef, attachment, 'data_url');
            // Get download url
            attachmentUrl = await getDownloadURL(response.ref);
        }
        
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };

        // Nweet 등록 
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), nweetObj);
            setNweet("");
            setAttachment("");
        } catch(e) {
            console.error("Error : ", e);
        }
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        // Preview Image
        const { target: { files }} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result }} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment("");
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's on your mind?" value={nweet} maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                { attachment && (
                    <div>
                        <img src={attachment} width="100px" height="100px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;