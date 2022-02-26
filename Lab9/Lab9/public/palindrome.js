function isPalindrome(str) {
  if (typeof str !== "string") {
    return false;
  }
  if (str.trim() === "") {
    return false;
  }
  if (
    str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() ===
    str
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase()
      .split("")
      .reverse()
      .join("")
  ) {
    return true;
  } else {
    return false;
  }
}

const palindromeForm = document.getElementById("palindrome-form");
if (palindromeForm) {
  palindromeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const phrase = document.getElementById("phrase").value;
    let error = document.getElementById("error");

    if (typeof phrase !== "string") {
      let error = document.getElementById("error");
      error.className = "error-Container-hidden";
    }
    if (phrase && phrase.trim() !== "") {
      if (error.childNodes.length === 1) {
        error.removeChild(error.childNodes[0]);
      }
      if (isPalindrome(phrase)) {
        let li = document.createElement("li");
        let node = document.createTextNode(phrase);
        li.appendChild(node);
        li.className = "is-palindrome";
        let ol = document.getElementById("attempts");
        ol.appendChild(li);
      } else {
        let li = document.createElement("li");
        let node = document.createTextNode(phrase);
        li.appendChild(node);
        li.className = "not-palindrome";
        let ol = document.getElementById("attempts");
        ol.appendChild(li);
      }
    } else {
      let error = document.getElementById("error");
      if (error.childNodes.length === 1) {
        error.removeChild(error.childNodes[0]);
      }
      let node = document.createTextNode(
        "Please enter a phrase to check for palindrome"
      );
      error.appendChild(node);
    }
  });
}
