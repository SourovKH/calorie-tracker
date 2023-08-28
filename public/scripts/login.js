const submitUserDetails = () => {
  const username = document.querySelector("#username-box").value;
  const password = document.querySelector("#password-box").value;

  const request = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  };

  fetch("/login", request)
    .then((res) => res.json())
    .then((body) => {
      if (!body.username) {
        window.location.href = "/";
        return;
      }

      if (!body.password) {
        document
          .querySelector("#password-box")
          .classList.add("invalid-password");
        return;
      }

      window.location.href = body.location;
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
