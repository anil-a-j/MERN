import { getAccessKey } from "../commonServices/commonServices";

export const getCandidatesService = async () => {
  let accessToken = await getAccessKey();
  const api = await fetch("/api/candidate/getcandidates", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const getCandidateService = async (id) => {
  let accessToken = await getAccessKey();
  const api = await fetch(`/api/candidate/getcandidate/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const createCandidateService = async (data) => {
  let accessToken = await getAccessKey();
  const api = await fetch("/api/candidate/createcandidate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const deleteCandidateService = async (deleteId) => {
  let accessToken = await getAccessKey();
  const api = await fetch(`/api/candidate/deletecandidate/${deleteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (api.status !== 204) {
    throw new Error("delete option is temporarily unavailable!");
  }
  return true;
};

export const changeCandidateResultService = async (data) => {
  let accessToken = await getAccessKey();
  const api = await fetch("/api/candidate/changecandidateresult", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (api.status !== 200) {
    throw new Error("change result is temporarily unavailable!");
  }
  return true;
};
