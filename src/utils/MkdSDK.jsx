import axios from "axios";

export default function MkdSDK() {
  this._baseurl = "https://reacttask.mkdlabs.com";
  this._project_id = "reacttask";
  this._secret = "d9hedycyv6p7zw8xi34t9bmtsjsigy5t7";
  this._table = "";
  this._custom = "";
  this._method = "";

  const raw = this._project_id + ":" + this._secret;
  let base64Encode = btoa(raw);

  this.setTable = function (table) {
    this._table = table;
  };

  this.login = async function (email, password, role) {
    //TODO
    // console.log(this._baseUrl);
    console.log(email, password, role);
    const url = `https://reacttask.mkdlabs.com/v2/api/lambda/login`;
    const options = {
      headers: {
        "content-type": "text/json",
        "x-project":
          "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw",
      },
    };
    // const data = JSON.stringify({
    //   email,
    //   password,
    //   role,
    // });
    // axios
    //   .post(url, data, options)
    //   .then((response) => {
    //     console.log(response);
    //     return response;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return error;
    //   });

    // const results = await fetch(
    //   "https://reacttask.mkdlabs.com/v2/api/lambda/login",
    //   {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //       "x-project":
    //         "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw",
    //     },
    //     body: data,
    //   }
    // );
    // return results;

    const loginURL = "https://reacttask.mkdlabs.com/v2/api/lambda/login";
    const data = { email, password, role };
    const requestObj = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project":
          "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(loginURL, requestObj);
    return await res.json();
  };

  this.getHeader = function () {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw",
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };

  this.callRestAPI = async function (payload, method) {
    const header = {
      "Content-Type": "application/json",
      "x-project":
        "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    switch (method) {
      case "GET":
        const getResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/GET`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonGet = await getResult.json();

        if (getResult.status === 401) {
          throw new Error(jsonGet.message);
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message);
        }
        return jsonGet;

      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/video/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        return jsonPaginate;
      default:
        break;
    }
  };

  this.check = async function (role) {
    //TODO
    const checkUrl = "https://reacttask.mkdlabs.com/v2/api/lambda/check";
    const data = { role };
    const requestObj = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project":
          "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(checkUrl, requestObj);
    return await res.json();
  };

  return this;
}
