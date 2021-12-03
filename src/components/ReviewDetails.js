import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addReview, deleteReview, getReviewsOrReview, updateReview } from "../api";
export default function ReviewDetails() {
  const [state, setstate] = useState({});
  const [view, setview] = useState("add");
  const [success, setsuccess] = useState("");
  const params = useParams();

  const setFields = (key) => (value) => {
    let final = {
      ...state,
      [key]: value,
    };

    setstate(final);
  };

  useEffect(() => {
    if (params.reviewId) {
      setview("edit");
      getReviewDetails();
    }
  }, [params.reviewId]);

  const getReviewDetails = () => {
    getReviewsOrReview({ query: params.reviewId })
      .then((data) => {
        if (data.success) {
          setstate(data.result[0]);
        }
      })
      .catch((Err) => {
        console.log(Err);
        return;
      });
  };

  const handleAddReview = () => {
    addReview({ ...state })
      .then((data) => {
        if (data.success) {
            setsuccess("review added successfully");
          }
      })
      .catch((Err) => {
        console.log(Err);
        return;
      });
  };

  const handleUpdateReview = () => {
    updateReview({ review: { ...state } })
      .then((data) => {
        if (data.success) {
            setsuccess("review updated sucessfully");
          } 
      })
      .catch((Err) => {
        console.log(Err);
        return;
      });
  };

  const handleDeleteReview = () => {
    deleteReview({ review: { ...state } })
      .then((data) => {
        console.log(data);
        if (data.success) {
          setsuccess("review deleted sucessfully");
        } 
      })
      .catch((Err) => {
        console.log(Err);
        return;
      });
  };

  return (
    <>
      <div class="container">
        <div class="review">
          <h3>{view === "edit" ? "Edit Review" : "Add Review"}</h3>
          <fieldset>
            <input
              placeholder="title"
              value={state && state.title}
              onChange={(e) => setFields("title")(e.target.value)}
              type="text"
            />
          </fieldset>

          <fieldset>
            <textarea
              placeholder="Type content here...."
              tabindex="5"
              value={state && state.content}
              onChange={(e) => setFields("content")(e.target.value)}
            ></textarea>
          </fieldset>
          <fieldset>
            <button
              type="button"
              onClick={(e) => {
                if (view === "edit") {
                  handleUpdateReview();
                } else {
                  handleAddReview();
                }
              }}
              disabled={!state || !state.title || !state.content}
            >
              Save
            </button>
          </fieldset>
          {view === "edit" && (
            <fieldset>
              <button
                type="button"
                onClick={(e) => {
                  handleDeleteReview();
                }}
              >
                delete
              </button>
            </fieldset>
          )}
          {success && (
            <p
              style={{ color: "green", fontSize: "10px", textAlign: "center" }}
            >
              {success}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
