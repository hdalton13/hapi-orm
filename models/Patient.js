//Heather Dalton
//11/12/2021
const { Model } = require("objection");

class Patient extends Model {
  static tableName = "patient";

  static relationMappings = {
    vaccination: {
      relation: Model.HasOneThroughRelation,
      modelClass: require("./Vaccine"),
      join: {
        from: "patient.id",
        through: {
          from: "vaccination.patient_id",
          to: "vaccination.vaccine_id",
        }, //end through
        to: "vaccine.id",
      }, //end join
    }, //vaccine end
  }; // end relation
} //end class

//many to many with vaccine
module.exports = Patient;
