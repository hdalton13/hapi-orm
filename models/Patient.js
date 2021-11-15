//Heather Dalton
//11/12/2021
const { Model } = require("objection");
const {Vaccine} = require("./Vaccine.js")


class Patient extends Model {
    static tableName = 'patient';

    static relationMappings = {
            vaccine:{
                relation:Model.HasOneThroughRelation,
                modelClass: Vaccine,
                join: {
                    from: 'patient.patient_id',
                    through: {
                        from: 'vaccination.patient_id',
                        to: 'vaccination.vaccine_id'
                    }, //end through
                    to:  'vaccine.vaccine_id'
                }//end join
            }//vaccine end
        }; // end relation
}//end class

//many to many with vaccine
module.exports = Patient;
