export const registerFacilityHandler = async (body, token) => {
  let responce;
  let succed = false;
  try {
    let apiresponce = await fetch(
      "https://reportahealthform.herokuapp.com/v1/facility",
      // " https://7b8a8483.ngrok.io/v1/facility",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    if (apiresponce.status === 201) {
      succed = true;
    }
    responce = await apiresponce.json();
  } catch (error) {
    responce = error;
    succed = false;
  }
  return { responce, succed };
};

export const getFacilityHandler = async (token) => {
  let responce;
  let succed = false;
  try {
    let apiresponce = await fetch(
      "https://reportahealthform.herokuapp.com/v1/facility/user",
      // " https://7b8a8483.ngrok.io/v1/facility/user",
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    if (apiresponce.status === 200) {
      succed = true;
    }
    responce = await apiresponce.json();
  } catch (error) {
    responce = error;
    succed = false;
  }
  return { succed, responce };
  // return responce;
};
