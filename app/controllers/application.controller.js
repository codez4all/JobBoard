/*
/!**
 * Created by sheetal on 3/14/17.
 *!/

module.exports.create = createApplication;

function createApplication(req, res, next) {
  Application.create({
    user: req.user._id,
    job: req.params.jobId
  }, function(err, application) {
    if (err) {
    return next(err);
  }
  res.status(201).json(application);
});
}


module.exports.findById = findApplicationById;

function findApplicationById(req, res, next) {
  if (!ObjectId.isValid(id)) {
    res.status(404).send({ message: 'Not found.'});
  }
  Application.findById(req.params.applicationId, function(err, application)
  {
    if (err) {
    return next(err);
  }
  res.resources.application = application;
  next();
});
}

module.exports.getAll = getAllApplications;

function getAllApplications(req, res, next) {
  const limit = +req.query.limit || 50;
  const skip = +req.query.skip || 0;
  var query = {
    job: req.params.jobId
  };
  if (req.query.status) {
    query.status = req.query.status;
  }
  Application
    .find(query)
    .limit(limit)
    .skip(offset)
    .exec(function(err, applications)  {
    if (err) {
    return next(err);
  }
  req.resources.applications = applications;
  next();
});
}


module.exports.update = updateApplication;

function updateApplication(req, res, next) {
  req.resources.application.status = req.body.status;
  req.resources.application.save(function(err, updatedApplication){
    if (err) {
    return next(err);
  }
  res.json(updatedApplication);
});
}

module.exports.remove = removeApplication;

function removeApplication(req, res, next) {
  req.resources.application.remove(function(err) {
    if (err) {
    return next(err);
  }
  res.json(req.resources.application);
});
}
*/
