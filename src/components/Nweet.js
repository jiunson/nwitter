import React, { useState } from "react";
import { dbIns, dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    // 삭제 
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok) {
            // delete nweet
            await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
            
            // delete nweet's attachfile
            const imageRef = ref(storageService, nweetObj.attachmentUrl); 
            deleteObject(imageRef).then(() => {
                console.log("delete image");
            }).catch((err) => { console.log(err)});
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    // 수정 
    const onSubmit = async (event) => {
        event.preventDefault();
        // update nweet
        await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
            text: newNweet
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const { target: { value }} = event;
        setNewNweet(value);
    };
    return (
        <div className="nweet">
            {editing ? (
                <>
                {isOwner && <><form onSubmit={onSubmit} className="container nweetEdit">
                        <input type="text" onChange={onChange} placeholder="Edit your nweet" autoFocus value={newNweet} required className="formInput" />
                        <input type="submit" value="Update Nweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button></>
                }
                </>
            ) : (
                <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && (<img src={nweetObj.attachmentUrl} />)}
                {isOwner && (
                    <div className="nweet__actions">
                        <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></span>
                        <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></span>
                    </div>
                )}
                </>
            )}
        </div>
    );
}

export default Nweet;