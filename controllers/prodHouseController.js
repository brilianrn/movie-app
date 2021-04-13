// const { Movie } = require('../models/index.js');
const {ProductionHouse, Movie} = require('../models');

class Controller{
    static listData(req, res){
        ProductionHouse.findAll()
        .then(prodHouses => {
            res.render('prodHouse.ejs', {data: prodHouses})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static add(req, res){
        
    }

    static saveAdd(req, res){
        
    }

    static edit(req, res){
        
    }

    static saveEdit(req, res){
        
    }

    static delete(req, res){
        
    }
}

module.exports = Controller;