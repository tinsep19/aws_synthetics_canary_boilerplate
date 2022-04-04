const SyntheticsLogHelper = class {
  getSanitizedUrl(url, stepConfig = {}) {
    return url;
  }

  getSanitizedErrorMessage(message, stepConfig = {}) {
    return message;
  }
  getSanitizedHeaders(headers, stepConfig = {}) {
    return headers;
  }
};
module.exports = new SyntheticsLogHelper();
