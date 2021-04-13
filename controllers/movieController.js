const {ProductionHouse, Movie, Cast, MovieCast} = require('../models');

class Controller{
    static listData(req, res){
        Movie.findAll({
            include: ProductionHouse,
            order: [
                ['released_year', 'DESC']
            ]
        })
        .then(movies => {
            res.render('movies.ejs', {data: movies})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static add(req, res){
        ProductionHouse.findAll()
        .then(data => {
            res.render('movieAdd.ejs', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static saveAdd(req, res){
        let newData = {
            name: req.body.name,
            released_year: +req.body.released_year,
            genre: req.body.genre,
            rating: +req.body.rating,
            ProductionHouseId: req.body.ProductionHouseId
        }

        Movie.create(newData)
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static edit(req, res){
        let dataEdit = ''
        Movie.findByPk(+req.params.id, {
            include: ProductionHouse
        })
        .then(getDataById => {
            dataEdit = getDataById
            return ProductionHouse.findAll()
        })
        .then(dataProdHouse => {
            res.render('movieEdit.ejs', {dataProdHouse, dataEdit})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static saveEdit(req, res){
        let getId = {id: +req.params.id}
        let dataEdit = {
            id: getId.id,
            name: req.body.name,
            released_year: +req.body.released_year,
            genre: req.body.genre,
            rating: +req.body.rating,
            ProductionHouseId: req.body.ProductionHouseId
        }

        Movie.update(dataEdit, {where: getId})
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete(req, res){
        Movie.destroy({ where: { id: +req.params.id } })
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addCast(req, res){
        let getDataById = ''
        let allData = ''
        Movie.findByPk(req.params.id)
        .then(data => {
            getDataById = data
            return Cast.findAll()
        })
        .then(data => {
            allData = data
            return MovieCast.findAll({
                include: Cast
            })
        })
        .then(dataMovieCasts => {
            res.render('movieAddCast.ejs', {dataById: getDataById, allData, dataMovieCasts})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static saveAddCast(req, res){
        let newData = {
            MovieId: +req.params.id,
            CastId: +req.body.actor,
            role: req.body.role
        }
        MovieCast.create(newData)
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller;