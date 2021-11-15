//Heather Dalton
//11/12/2021
const { Model } = require("objection");
const { Patient } = require("./Patient.js");
const { Company } = require("./Company.js");


class Vaccine extends Model {
  static tableName = "vaccine";

  static relationMappings = {
    patient: {
      relation: Model.HasOneThroughRelation,
      modelClass: Patient,
      join: {
        from: "vaccine.vaccine_id",
        through: {
          from: "vaccination.vaccine_id",
          to: "vaccination.patient_id",
        }, //end through
        to: "patient.patient_id",
      }, //end join
    }, //category end
    company: {
      relation: Model.HasManyRelation,
      modelClass: Company,
      join: {
        from: "vaccine.company_id",
        to: "company.id",
      }, //end join
    },
  }; //end relation

} //end class
module.exports = Vaccine;
