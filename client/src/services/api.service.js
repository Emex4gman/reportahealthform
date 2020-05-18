export const registerFacilityHandler = async (body, token) => {
  let responce;
  try {
    let apiresponce = await fetch(
      "https://reportahealthform.herokuapp.com/v1/facility",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    responce = await apiresponce.json();
  } catch (error) {
    responce = error;
  }
  return responce;
};
