const age = require('../helpers/age.js');
const { Cast, Movie, ProductionHouse } = require('../models/index.js');

class Controller{
    static listData(req, res){
        Cast.findAll({
            include: Movie
        })
        .then(data => {
            res.render('casts.ejs', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static add(req, res){
        res.render('castAdd.ejs')
    }

    static saveAdd(req, res){
        let newData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        }
        Cast.create(newData)
        .then(data => {
            res.redirect('/casts')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static edit(req, res){
        Cast.findByPk(+req.params.id)
        .then(data => {
            res.render('castEdit.ejs', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static saveEdit(req, res){
        let getId = {id: +req.params.id}
        let dataEdit = {
            id: getId.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        }
        Cast.update(dataEdit, {where: getId})
        .then(data => {
            res.redirect('/casts')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete(req, res){
        let getId = {id: +req.params.id}
        Cast.destroy({where: getId})
        .then(_=> {
            res.redirect('/casts')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static seeMovies(req, res){
        Cast.findByPk(+req.params.id, {
            include: Movie
        })
        .then(data => {
            let sendAge = []
            for (let i = 0; i < data.Movies.length; i++) {
                sendAge.push(age(data.Movies[i].released_year, data.birth_year))
            }
            let sendData = {
                first_name: data.first_name,
                last_name: data.last_name,
                age: sendAge,
                Movies: data.Movies
            }
            // res.send(sendData)
            res.render("castSeeMovie.ejs", {data: sendData})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller