/**
 * Created by sheetal on 3/14/17.
 */

module.exports.onlyMembers = authorizeOnlyToCompanyMembers;

function authorizeOnlyToCompanyMembers(req, res, next) {
// check if user is member of company
  const isMember = req.resources.company.members.find(function(member){
    return member.toString() === req.user._id.toString();
  });

  if (!isMember) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
}

router.put(
 '/companies/:companyId',
 auth.ensured,
 companyCtrl.findById,
 authorize.onlyOwner,
 companyCtrl.update,
 response.toJSON('company')
 );

