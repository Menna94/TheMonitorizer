const axios = require("axios").default;

exports.poll = (check) => {
  console.log(check.url);
  const username = check.authentication.username;
  const password = check.authentication.password;

  const authBuffer = Buffer.from(username + ":" + password);
  const b64 = authBuffer.toString("base64");

  const axiosConfigs = {
    timeout: check.timeout,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Basic ${b64}`,
    },
  };

  const requestInterval = setInterval(sendRequest, check.interval * 1000);

  let failedRequests = 0;

  function sendRequest() {
    axios
      .get(check.url, axiosConfigs)
      .then(function (response) {
        
        if (response.status === 200) {
          return console.log("PERFECT");
        }

        console.log("BAAAD");
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error.response.status");

          failedRequests++;

          console.log(failedRequests);

          if (failedRequests === check.threshould) {
            clearInterval(requestInterval);
            console.log("post interval");
          }

        } else if (error.request) {
          console.log("error.request");
          console.log(error.request);

          failedRequests++;

          console.log(failedRequests);

          if (failedRequests === check.threshould) {

            clearInterval(requestInterval);

            console.log("post interval request");
          }
        } else {

          console.log("Error", "error.message");

        }
      });
  }
};
