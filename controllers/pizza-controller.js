const { Pizza } = require("../models");

const pizzaController = {
    // GET all pizzas "/api/pizzas"
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: "comments",
                select: "-__v"
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET one pizza "/api/pizzas/:id"
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: "comments",
                select: "-__v"
            })
            .select("-__v")
            .then(dbPizzaData => {
                if (!dbPizzaData) return res.status(404).json({ message: "No pizza found with this id!" });

                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // CREATE pizza "/api/pizzas"
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // UPDATE pizza "/api/pizzas/:id"
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(dbPizzaData => {
                if (!dbPizzaData) return res.status(404).json({ message: "No pizza found with this id!" });
            
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE pizza "/api/pizzas/:id"
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) return res.status(404).json({ message: "No pizza found with this id!" });

                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = pizzaController;