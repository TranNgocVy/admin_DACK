const publisherservice = require('../services/publisherService');

const { multipleSequelizeToObject } = require('../../util/sequelize');

class publisherController {
  //[GET]: publishers/publisher-manager
  async show(req, res, next) {
    try {
      if (req.user) {
        var type = req.query.type;
        var publishers = await publisherservice.getPublisher(type);
        res.render('publisher/NXB-manager', {
          title: 'Book Selling',
          publishers: multipleSequelizeToObject(publishers),
        });
      } else {
        res.redirect('/');
      }
    } catch (e) {
      next(e);
    }
  }

  //[POST]: publishers/add
  async adding(req, res, next) {
    try {
      if (req.user) {
        var publisher = await publisherservice.addPublisher(req);
        res.redirect('back');
      } else {
        res.redirect('/');
      }
    } catch (e) {
      next(e);
    }
  }
  //[PUT] : publishers/:nxb/update
  async update(req, res, next) {
    try {
      if(req.user){
        var nxbup = await publisherservice.upPublisher(req)
        res.redirect('back')
      }else{
        res.redirect('/');
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new publisherController();
