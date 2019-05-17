export const isSuperAdmin = (role: string) => {
  if (role === "SuperAdmin") {
    return true;
  } else {
    return false;
  }
};

export const isMaster = (role: string) => {
  if (role === "TC Master") {
    return true;
  } else {
    return false;
  }
};

export const isTechnical = (role: string) => {
  if (role === "TC Technical") {
    return true;
  } else {
    return false;
  }
};

export const isSales = (role: string) => {
  if (role === "TC Sales") {
    return true;
  } else {
    return false;
  }
};

export const isUserMaster = (role: string) => {
  if (role === "User Master") {
    return true;
  } else {
    return false;
  }
};

export const isUserHR = (role: string) => {
  if (role === "User HR") {
    return true;
  } else {
    return false;
  }
};

export const isUserPower = (role: string) => {
  if (role === "User Power") {
    return true;
  } else {
    return false;
  }
};

export const isUserPowerOrHR = (role: string) => {
  const userArray: string[] = ["User Power", "User HR"];
  return userArray.includes(role);
};
