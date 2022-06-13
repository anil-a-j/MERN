import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CandidateCreationModal from "../components/CandidateCreationModal/CandidateCreationModal";
import { selectAuth } from "../redux/auth/authSlice";
import {
  selectCandidate,
  getCandidates,
  deleteCandidate,
  changeCandidateResult,
  getCandidate,
} from "../redux/candidate/candidateSlice";

const CandidateScreen = () => {
  const [visibleModal, setVisibleModal] = useState("d-none");
  const [error, setError] = useState("");
  const { userInfo } = useSelector(selectAuth);
  const {
    candidates,
    createCandidateStatus,
    deleteCandidateStatus,
    changeCandidateResultError,
    changeCandidateResultStatus,
  } = useSelector(selectCandidate);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (createCandidateStatus === "new candidate added") {
      dispatch(getCandidates());
    }
    if (deleteCandidateStatus) {
      setError(deleteCandidateStatus);
    }
    if (changeCandidateResultStatus === "Result changed") {
      dispatch(getCandidates());
    }
    if (changeCandidateResultError) {
      setError(changeCandidateResultError);
    }
  }, [
    userInfo,
    createCandidateStatus,
    deleteCandidateStatus,
    changeCandidateResultError,
    changeCandidateResultStatus,
    navigate,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

  const closeModal = (childData) => {
    setVisibleModal(childData);
  };

  return (
    <div className="candidate-page">
      <div className="container">
        <div>
          <p>Candidates List : {candidates.length}</p>
        </div>
        <div className="table">
          <div className="table-head">
            <div className="count"></div>
            <div>
              <p className="text-small">Name</p>
            </div>
            <div>
              <p className="text-small">Date of Birth</p>
            </div>
            <div>
              <p className="text-small">Email</p>
            </div>
            <div>
              <p className="text-small text-center">Result</p>
            </div>
            <div className="edit"></div>
          </div>

          {candidates &&
            candidates.map((candidate, k) => (
              <div className="table-row" key={k}>
                <div className="count text-center text-medium">{k + 1}</div>
                <div>
                  <p className="text-medium">{candidate.name}</p>
                </div>
                <div>
                  <p className="text-medium">{candidate.dob}</p>
                </div>
                <div>
                  <p className="text-medium">{candidate.email}</p>
                </div>
                <div>
                  <select
                    className="text-medium"
                    value={candidate.result}
                    onChange={(e) => {
                      dispatch(
                        changeCandidateResult({
                          id: candidate._id,
                          value: e.target.value,
                        })
                      );
                    }}
                  >
                    <option>Shortlist</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div className="edit">
                  <a
                    href="#"
                    onClick={() => {
                      dispatch(getCandidate(candidate._id));
                      setVisibleModal("d-flex");
                    }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </a>
                  <a
                    href="#"
                    onClick={() => {
                      dispatch(deleteCandidate(candidate._id));
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </a>
                </div>
              </div>
            ))}
        </div>
        <div className="add-candidate">
          <a
            href="#"
            className="text-medium text-blue"
            onClick={() => {
              setVisibleModal("d-flex");
            }}
          >
            + Add new candidate
          </a>
        </div>
        {error && <p className="text-small text-danger text-center">{error}</p>}
      </div>
      <CandidateCreationModal visible={visibleModal} closeModal={closeModal} />
    </div>
  );
};

export default CandidateScreen;
