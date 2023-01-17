export const getEpochTime = (deadline:string):number => {
    const now = new Date(deadline);
    console.log(deadline)
    return Math.round(now.getTime() / 1000);
  };
  