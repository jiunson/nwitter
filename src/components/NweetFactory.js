import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        if (nweet === "") {
            return;
        }
        // Upload Attachment
        let attachmentUrl;
        if(attachment !== "") {
            // 파일 업로드를 수행하기 위해 작업할 파일을 가리키는 참조.
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            // Upload file
            const response = await uploadString(fileRef, attachment, 'data_url');
            // Get download url
            attachmentUrl = await getDownloadURL(response.ref);
        }
        
        let nweetObj;
        if(attachmentUrl == undefined) {
            nweetObj = {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl: "",
            };
        } else {
            nweetObj = {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl: attachmentUrl,
            };
        }

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
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input type="text" className="factoryInput__input" onChange={onChange} placeholder="What's on your mind?" value={nweet} maxLength={120} />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input type="file" id="attach-file" accept="image/*" onChange={onFileChange} style={{ opacity: 0 }} />
            { attachment && (
                <div className="factoryForm__attachment">
                <img
                  src={attachment}
                  style={{
                    backgroundImage: attachment,
                  }}
                />
                <div className="factoryForm__clear" onClick={onClearAttachment}>
                  <span>Remove</span>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                </div>
            )}
        </form>
    );
};
export default NweetFactory;