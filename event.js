var name;
var id;
var person = [];
var personID = 1;

function Event(name, id) {
    this.name = name;
    this.id = id;

    this.addPerson = function (name) {
      person.push(name);
    }

}



module.exports = Event
