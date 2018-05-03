describe('Hiptest Demo', function () {
  this.timeout(10000)
  beforeEach(function () {
    this.actionwords = Object.create(require('./actionwords.js').Actionwords);
  });

  it('User can search for services in location (uid:74104d80-b0a9-43aa-8085-b5ab9b512fea)', function (done) {
    // Given User can select a location
    var self = this
    this.actionwords.userCanSelectALocation()
    .then(function() {
      // Given User can select a Service
      return self.actionwords.userCanSelectAService();
    })
    .then(function() {
      // Then User will be shown the question set "" ""
      return self.actionwords.userWillBeShownTheQuestionSet("", "");
    })
    .then(function(results) {
      // Then Searches are valid
      if (!self.actionwords.searchesAreValid(results)) {
        throw "Search Results are empty"
      }
      done()
    })
  });

  it('User Services Location Not Found (uid:955cbe71-8c39-4bf2-954a-b656ce1f75bc)', function (done) {
    var self = this
    // Given User can select a location
    this.actionwords.userCanSelectALocation()
    .then(function() {
      // Given User can select a Service
      return self.actionwords.userCanSelectAService();
    })
    .then(function() {
      // Then User will be shown the question set "" ""
      return self.actionwords.userWillBeShownTheQuestionSet("", "");
    })
    .then(function(results) {
      // And Search Results should be empty
      if (!self.actionwords.searchResultsShouldBeEmpty(results)) {
        throw "Search Results are not empty"
      }
      done()
    })
  });

});
