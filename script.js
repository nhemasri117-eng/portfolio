function showProject3Code(fileName) {

    const codeDisplay =
        document.getElementById("project3-code-display");

    const fileNameDisplay =
        document.getElementById("project3-file-name");

    fileNameDisplay.textContent = fileName;

    fetch("project3code/" + fileName + ".txt")
        .then(response => {

            if (!response.ok) {
                throw new Error("File not found");
            }

            return response.text();
        })

        .then(code => {

            codeDisplay.textContent = code;

        })

        .catch(error => {

            codeDisplay.textContent =
                "Unable to load " + fileName;

            console.error(error);

        });
}