
class SyntheticsConfiguration {
  setConfig(opt) { }
  disableAggregatedRequestMetrics() { }
  disableRequestMetrics() { }
  disableStepMetrics() { }
  enableAggregatedRequestMetrics() { }
  enableRequestMetrics() { }
  enableStepMetrics() { }
  get2xxMetric() { return true; }
  get4xxMetric() { return true; }
  get5xxMetric() { return true; }
  getAggregated2xxMetric() { return true; }
  getAggregated4xxMetric() { return true; }
  getAggregatedFailedCanaryMetric() { return true; }
  getAggregatedFailedRequestsMetric() { return true; }
  getAggregated5xxMetric() { return true; }
  getFailedCanaryMetric() { return true; }
  getFailedRequestsMetric() { return true; }
  getStepDurationMetric() { return true; }
  getStepSuccessMetric() { return true; }
  with2xxMetric(_2xxMetric) { }
  with4xxMetric(_4xxMetric) { }
  with5xxMetric(_5xxMetric) { }
  withAggregated2xxMetric(aggregated2xxMetric) { }
  withAggregated4xxMetric(aggregated4xxMetric) { }
  withAggregated5xxMetric(aggregated5xxMetric) { }
  withAggregatedFailedCanaryMetric(aggregatedFailedCanaryMetric) { }
  withAggregatedFailedRequestsMetric(aggregatedFailedRequestsMetric) { }
  withFailedCanaryMetric(failedCanaryMetric) { }
  withFailedRequestsMetric(failedRequestsMetric) { }
  withStepDurationMetric(stepDurationMetric) { }
  withStepSuccessMetric(stepSuccessMetric) { }
  withHarFile() { }
  withStepsReport() { }
  withIncludeUrlPassword() { }
  withRestrictedUrlParameters() { }
  withLogRequest() { }
  withLogResponse() { }
  withLogRequestBody() { }
  withLogResponseBody() { }
  withLogRequestHeaders() { }
  withLogResponseHeaders() { }
  getHarFile() { return true; }
  getStepsReport() { return true; }
  getIncludeUrlPassword() { return true; }
  getRestrictedUrlParameters() { return true; }
  getLogRequest() { return true; }
  getLogResponse() { return true; }
  getLogRequestBody() { return true; }
  getLogResponseBody() { return true; }
  getLogRequestHeaders() { return true; }
  getLogResponseHeaders() { return true; }
  disableStepScreenshots() { }
  enableStepScreenshots() { }
  getScreenshotOnStepFailure() { }
  getScreenshotOnStepStart() { }
  getScreenshotOnStepSuccess() { }
  withScreenshotOnStepStart(screenshotOnStepStart) { }
  withScreenshotOnStepSuccess(screenshotOnStepSuccess) { }
  withScreenshotOnStepFailure(screenshotOnStepFailure) { }
  withVisualVarianceThresholdPercentage(desiredPercentage) { }
  withVisualVarianceHighlightHexColor(color) { }
  withFailCanaryRunOnVisualVariance(failCanary) { }
}

module.exports = SyntheticsConfiguration;
