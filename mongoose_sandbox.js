'use strict';

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err){
	console.error("connection error:", err);
});

db.once("open", function(){
	console.log("db connection successful");

	var Schema = mongoose.Schema;
	var AnimalSchema = new Schema({
		type: {type: String, default: "cat"},
		color: {type: String, default: "small"},
		size: {type: String, default: "gray and white"},
		mass: {type: String, default: "5"},
		name: {type: String, default: "Oliver"},
	});

	// AnimalSchema.pre("save", function(next) {

	// 	next();
	// });

	AnimalSchema.statics.findSize= function(size, callback){
		// this = animal
		return this.find({size: size}, callback);
	};

	// Instance method
	AnimalSchema.methods.findSameColor = function() {
		return this.model("Animal").find({color: this.color}, callback);
	};

	var Animal = mongoose.model("Animal", AnimalSchema);

	var elephant = new Animal({
		type: "elephant",
		color: "gray",
		size: "big",
		mass: 6000,
		name: "Lawrence"
	});

	//var animal = new Animal({}); //cat



	elephant.save(function(err) {
		if(err) console.log("Save Failed.", err);
		else console.log("Saved!");
		Animal.find({size: "big"}, function(err, animals){
			animals.forEach(function(animal){
				console.log(animal.name + "the" + animal.color + " " + animal.type);
			});
		});
		db.close(function(){
			console.log("Connection closed");
		});
	});

});