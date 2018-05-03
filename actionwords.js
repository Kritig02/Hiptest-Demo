var chai = require('chai')
var chaiHttp = require('chai-http')
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should(); 
chai.use(chaiHttp);





exports.Actionwords = {
  userCanSelectALocation: function () {
    // TODO: Implement result: "location_name"
    return new Promise(function(resolve, reject) {
      chai.request('https://my.staging.kaodim.com/api/v1/services/service_areas')
    .get('/')
    .end(function(err, res) {
      if (err) reject("ERROR FOUND")
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('array')
      resolve(res.body[1])
      })    
    })
  },
  userCanSelectAService: function () {
    // TODO: Implement result: "service_name"
    return new Promise(function(resolve, reject) {
      chai.request('https://my.staging.kaodim.com/api/v1/services/service_types/search?name=jbj')
    .get('/')
    .end(function(err, res) {
      if (err) reject("ERROR FOUND")
      res.should.have.status(200)
      res.should.be.json
      if (res.body.related.length > 0) {
        return resolve(res.body.related[0])
      }
      resolve(res.body.related[0])
      })    
    })
 },
  userWillBeShownTheQuestionSet: function (locationNone, namelocationNone) {
    var self = this
    // Given User can select a location
    return this.userCanSelectALocation()
    .then(function(location) {
      // Given User can select a Service
      return self.userCanSelectAService()
        .then(function(service) {
          return {location: location, service: service}
        })
    })
    .then(function(location_service_object) {
      // Then Search Results
      return self.searchResults(location_service_object.location, location_service_object.service)
    })
  },
  searchResults: function (location, service) {
    return new Promise(function(resolve, reject) {
      var url = "https://my.staging.kaodim.com/api/v2.2/services/service_types/" + service.slug + "/service_areas/" + location.slug + "/question_set.json?analytics=am"
      chai.request(url)
      .get('/')
      .end(function(err, res) {
          if (err) reject("ERROR FOUND")
          res.should.have.status(200)
          res.should.be.json
          res.body.id.should.not.be.null
          resolve(res.body)
      })    
    })
  },
  searchResultsShouldBeEmpty: function (searchResults) {
    if (searchResults.errors != null) {
      return Promise.reject(false)
    } else {
      return Promise.resolve(true)
    }
  },
  searchesAreValid: function (searchResults) {
    if (searchResults.questions != null && searchResults.questions.length > 0) {
      return Promise.resolve(true)
    }
    return Promise.reject(false)
  }
};