export const registerFacilityHandler = async (body, token) => {
  let responce;
  let succed = false;
  try {
    const data = new FormData();
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    let apiresponce = await fetch(
      "http://fill.reportahealth.org/v1/facility",
      // "https://reportahealthform.herokuapp.com/v1/facility",
      // "http://localhost:7000/v1/facility",
      {
        method: "POST",
        body: data, //JSON.stringify(map),
        headers: {
          Authorization: token,
          // "Content-Type": "application/json",
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
      "http://fill.reportahealth.org/v1/facility/user",
      // "https://reportahealthform.herokuapp.com/v1/facility/user",
      // " http://localhost:7000/v1/facility/user",
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

export const updateFacilityHandler = async (body, token, id) => {
  let responce;
  let succed = false;
  try {
    let apiresponce = await fetch(
      "http://fill.reportahealth.org/v1/facility/" + id,
      // "https://reportahealthform.herokuapp.com/v1/facility/" + id,
      // "http://localhost:7000/v1/facility/" + id,
      {
        method: "PATCH",
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
