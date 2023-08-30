const submitUserDetails = () => {
  const username = document.querySelector("#username-box").value;
  const password = document.querySelector("#password-box").value;

  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  fetch("/login", request)
    .then((res) => {
      if (res.redirected) {
        location.replace(res.url);
        return;
      }
      return res.json();
    })
    .then(({ username, password }) => {
      if (!username || !password) {
        const invalidMsgElement = document.querySelector("#invalid-message");
        invalidMsgElement.innerText = "Invalid Credentials";
      }
    });
};

const main = () => {
  const form = document.querySelector("#login");

  form.onsubmit = (event) => {
    event.preventDefault();
    submitUserDetails();
  };
};

window.onload = main;
