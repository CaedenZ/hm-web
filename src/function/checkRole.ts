export const isSuperAdmin = (role: string) => {
  if (role === "SuperAdmin") {
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

export const isCustomerCAndB = (role: string) => {
  if (role === "Customer C&B") {
    return true;
  } else {
    return false;
  }
};

export const isCustomerHR = (role: string) => {
  if (role === "Customer HR") {
    return true;
  } else {
    return false;
  }
};

// AWAITING FINAL ROLE FROM API
// export const isSuperAdmin = (role: string) => {
//   if (role === "SuperAdmin") {
//     return true;
//   } else {
//     return false;
//   }
// };
