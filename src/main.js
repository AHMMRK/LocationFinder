const form = document.querySelector("#form-container");
const input = document.querySelector("#input");
const output = document.querySelector("#output");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = input.value;
  let status;

  const client = fetch(`http://api.zippopotam.us/us/${inputValue}`)
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      if (status === 200 && status !== 404) {
        input.value = '';
        output.innerHTML = "";
        const div = document.createElement("div");
        div.className = "w-9/12 bg-blue-200 mx-auto p-1 border-2 border-blue-500 mt-3";
        const resultTitle = document.createElement("div");
        resultTitle.className = "w-full bg-blue-500 p-2 text-white text-xl px-3 flex flex-row items-center justify-between";
        const span = document.createElement("span");
        span.textContent = "Location Info:";
        const closeResult = document.createElement("button");
        closeResult.setAttribute("id", "close-result");
        closeResult.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" fill="white" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>';

        const paragResult = document.createElement("p");
        paragResult.className = "w-full my-3 px-5";
        paragResult.innerHTML = `
          <h1>City : <span>${data.places[0]["place name"]}</span></h1>
          <h1>State : <span>${data.places[0].state}</span></h1>
          <h1>Longitude : <span>${data.places[0].longitude}</h1></h1>
          <h1>Latitude : <span>${data.places[0].latitude}</span></h1>
        `;

        resultTitle.appendChild(span);
        resultTitle.appendChild(closeResult);
        div.appendChild(resultTitle);
        div.appendChild(paragResult);
        output.appendChild(div);
      } else {
        output.innerHTML = "";
        const div = document.createElement("div");
        div.className = "w-9/12 bg-red-200 mx-auto p-1 border-2 border-red-400 mt-3";
        const resultTitle = document.createElement("div");
        resultTitle.className = "w-full bg-red-400 p-2 text-white text-xl px-3 flex flex-row items-center justify-between";
        resultTitle.textContent = "Invalid Zipcode, please try again later";

        div.appendChild(resultTitle);
        output.appendChild(div);
      }
    })
    .catch((err) => {
      output.innerHTML = "";
      input.value = '';
      const div = document.createElement("div");
      div.className = "w-9/12 bg-red-200 mx-auto p-1 border-2 border-red-400 mt-3";
      const resultTitle = document.createElement("div");
      resultTitle.className = "w-full bg-red-400 p-2 text-white text-xl px-3 flex flex-row items-center justify-between";
      resultTitle.textContent = "Invalid Zipcode, please try again later";

      div.appendChild(resultTitle);
      output.appendChild(div);
    });
});
