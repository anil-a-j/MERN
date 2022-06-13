export const signupService = async (data) => {
  const api = await fetch("/api/user/signupUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  localStorage.setItem("userInfo", JSON.stringify(response));
  return response;
};

export const loginService = async (data) => {
  const api = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await api.json();

  if (response.message) {
    throw new Error(response.message);
  }
  localStorage.setItem("userInfo", JSON.stringify(response));
  return response;
};

export const logoutService = async () => {
  const api = await fetch("/api/user/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (api.status !== 200) {
    throw new Error("Logout service temporarily unavailable!");
  }
  return true;
};
