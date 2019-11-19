//** CONVERTING JSON DATA */

exports.createHtmlStringFromJson = function(htmlContent, retrievedData) {
  let bodyBeginIndex = htmlContent.indexOf("<body>");
  let bodyEndIndex = htmlContent.indexOf("</body>");

  let stringUntilBody = htmlContent.slice(0, bodyBeginIndex + 6);
  let stringfromBody = htmlContent.slice(bodyEndIndex);

  let htmlString = `<table>`;

  htmlString += `<tr>`;
  for (let attribute in retrievedData[0]) {
    if (typeof retrievedData[0][attribute] !== "object") {
      htmlString += `<td>${attribute}</td>`;
    }
  }
  htmlString += `</tr>`;

  retrievedData.forEach(object => {
    htmlString += `</tr>`;
    for (let attribute in object) {
      if (typeof object[attribute] !== "object") {
        htmlString += `<td>${object[attribute]}</td>`;
      }
    }
    htmlString += `</tr>`;
  });

  htmlString += `</table>`;
  return stringUntilBody + htmlString + stringfromBody;
}



//** CONVERTING CSV DATA */

exports.createHtmlStringFromCsv = function(htmlContent, retrievedData) {
  let bodyBeginIndex = htmlContent.indexOf("<body>");
  let bodyEndIndex = htmlContent.indexOf("</body>");

  let stringUntilBody = htmlContent.slice(0, bodyBeginIndex + 6);
  let stringfromBody = htmlContent.slice(bodyEndIndex);

  let htmlString = `<table>`;
  htmlString += `<tr>`;

  retrievedData[0].forEach(attribute => {
    htmlString += `<td>${attribute}</td>`;
  });

  htmlString += `</tr>`;

  let data = retrievedData.slice(1);
  data.forEach(row => {
    htmlString += `<tr>`;
    row.forEach(cell => {
      htmlString += `<td>${cell}</td>`;
    });
    htmlString += `</tr>`;
  });

  htmlString += `</table>`;
  return stringUntilBody + htmlString + stringfromBody;
}