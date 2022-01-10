import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/user";
import { FildValue } from "../../lib/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState("");
  const {
    user: { displayName },
  } = useContext(UserContext);
  const handleSubmitComment = (event) => {
    event.preventDefault();
    setComments([{ displayName, comment }, ...comments]);
    setComment("");
    const docRef = doc(FildValue, "photos", docId);
    updateDoc(docRef, {
      comments: arrayUnion({ displayName, comment }),
    });
    return docRef;
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) =>
          comment.length > 1 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          type="text"
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          placeholder="Agregar un comentario..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && `opacity-25`
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default AddComment;

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
