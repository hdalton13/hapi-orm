//Heather Dalton
//11/12/2021
const { Model } = require("objection");

class Vaccine extends Model {
  static tableName = "vaccine";

  static get relationMappings() {
    return {
      vaccination: {
        relation: Model.HasOneThroughRelation,
        modelClass: require("./Patient"),
        join: {
          from: "vaccine.id",
          through: {
            from: "vaccination.vaccine_id",
            to: "vaccination.patient_id",
          }, //end through
          to: "patient.id",
        }, //end join
      }, //category end
      companies: {
        relation: Model.HasManyRelation,
        modelClass: require("./Company"),
        join: {
          from: "vaccine.company_id",
          to: "company.id",
        }, //end join
      },
    };
  } //end relation
} //end class

module.exports = Vaccine;
