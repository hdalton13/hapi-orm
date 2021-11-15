//Heather Dalton
//11/12/2021
const { Model } = require("objection");
const {Patient} = require("./Patient.js")


class Vaccine extends Model {
    static tableName = 'vaccine';

    static relationMappings = {
        patient:{
            relation:Model.HasOneThroughRelation,
            modelClass: Patient,
            join: {
                from: 'vaccine.vaccine_id',
                through: {
                    from: 'vaccination.vaccine_id',
                    to: 'vaccination.patient_id'
                }, //end through
                to:  'patient.patient_id'
            }//end join
        }//category end
    };//end relation


}//end class
module.exports = Vaccine;

