import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createCandidate,
  selectCandidate,
} from "../../redux/candidate/candidateSlice";
import "./CandidateCreationModal.scss";

const CandidateCreationModal = ({ visible, closeModal }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [state, setLocalState] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { candidatesError, createCandidateStatus } =
    useSelector(selectCandidate);

  const submitCreate = (e) => {
    e.preventDefault();
    if (!name || !dob || !email || !address || !state || !pincode) {
      setError("All fields are required!");
      return false;
    }
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.toLowerCase()) !== true) {
      setError("Invalid Email");
      return false;
    }
    if (state.toLowerCase() === "select your state") {
      setError("Choose State");
      return false;
    }
    if (pincode.length !== 6) {
      setError("pincode shoudl be 6 digit!");
      return false;
    }
    setError("");
    dispatch(
      createCandidate({
        name,
        dob: dob.split("-").reverse().join("/"),
        email,
        address,
        state,
        pincode,
      })
    );
    e.target.reset();
    closeModal("d-none");
  };

  useEffect(() => {
    if (candidatesError) {
      setError(candidatesError);
    }
    if (createCandidateStatus) {
      setMessage(createCandidateStatus);
    }
  }, [candidatesError, createCandidateStatus]);

  return (
    <div className={`candidate-modal d-flex  justify-center ${visible}`}>
      <div className="modal-box shadow-dark">
        <h2>Create Candidate</h2>
        <form className="form" onSubmit={submitCreate}>
          <div className="d-flex justify-between">
            <div className="column">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="enter your name"
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="enter your Date of Birth"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter your email"
                />
              </div>
            </div>
            <div className="column">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="enter your address"
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <select onChange={(e) => setLocalState(e.target.value)}>
                  <option>Select your state</option>
                  <option>Kerala</option>
                  <option>Goa</option>
                  <option>Andra Pradesh</option>
                  <option>Tamil Nadu</option>
                </select>
              </div>
              <div className="form-group">
                <label>Pin Code</label>
                <input
                  type="number"
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="enter your 6-digit pin code"
                />
              </div>
            </div>
          </div>
          {error && <p className="text-small text-danger">{error}</p>}
          {message && <p className="text-small text-success">{message}</p>}
          <div className="d-flex justify-right">
            <button
              type="reset"
              className="btn"
              onClick={() => {
                setError("");
                setMessage("");
                closeModal("d-none");
              }}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CandidateCreationModal.defaultProps = {
  visible: "d-none",
};

export default CandidateCreationModal;
