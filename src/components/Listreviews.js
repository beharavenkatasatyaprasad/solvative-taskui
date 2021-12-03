import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteReview, getReviewsOrReview } from "../api";

export default function Listreviews() {
  const [list, setlist] = useState([]);

  const handleDelete = (r) => {
    deleteReview({ review: { ...r } })
      .then((data) => {
        console.log(data);
        if (data.success) {
          getData();
        } 
      })
      .catch((Err) => {
        console.log(Err);
        return;
      });
  };

  useEffect(() => {
    getData();
  });

  const getData = () => {
    getReviewsOrReview()
      .then((data) => {
        if (data.success) {
          setlist(data.result);
        }
      })
      .catch((Err) => {
        console.log(Err);
        return;
      });
  };

  return (
    <div>
      <Link to="/add">
        <button>Add Review</button>
      </Link>
      {list && list.length > 0 ? (
        <table>
          <thead>
            <tr className="table-headers">
              <th>#</th>
              <th>id</th>
              <th>title</th>
              <th>content</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((r, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{r._id}</td>
                <td>{r.title}</td>
                <td>{r.content}</td>
                <td>
                  {
                    <Link to={`/edit/${r._id}`}>
                      <button>Update</button>
                    </Link>
                  }
                </td>
                <td>
                  {
                    <button
                      onClick={(e) => handleDelete(r)}
                      className="custom-btn"
                    >
                      Delete
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No reviews found</h2>
      )}
    </div>
  );
}
