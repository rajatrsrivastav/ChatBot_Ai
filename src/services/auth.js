export const signup = async ({ email, password }) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { err } = await response.json();
    console.log(err);
    throw new Error(err || "Signup failed");
  }

  return response;
};

export const login = async ({ email, password }) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { err } = await response.json();
    console.log(err);
    throw new Error(err || "Login failed");
  }

  return response;
};

export const logout = async ({ token }) => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { err } = await response.json();
    console.log(err);
    throw new Error(err || "Logout failed");
  }

  return response;
};
