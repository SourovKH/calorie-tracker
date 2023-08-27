const showTarget = (target) => {
  const targetElement = document.querySelector("#target");
  targetElement.innerText = `${target} cal`;
};

const requestToSetTarget = (target) => {
  const request = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ target }),
  };

  fetch("/calorie-tracker/target", request).then((res) => {
    if (res.status === 204) showTarget(target);
  });
};

const handleTargetSetter = () => {
  const targetBox = document.querySelector("#target-box");
  const setButton = document.querySelector("#set-button");

  setButton.onclick = () => {
    const target = targetBox.value;
    targetBox.value = 0;
    requestToSetTarget(target);
  };
};

const main = () => {
  handleTargetSetter();
};

window.onload = main;
