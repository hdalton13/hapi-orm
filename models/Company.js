//Heather Dalton
//11/12/2021
const { Model } = require("objection");
const {Vaccine} = require("./Vaccine.js")

class Company extends Model {
    static tableName = 'company';

    static relationMappings = {
        vaccine:{
            relation: Model.HasManyRelation,
            modelClass: Vaccine,
            join: {
                from: 'company.company_id',
                to: 'vaccine.company_id'
            }//end join
        }//end vaccine
    };//end relation


}//end class
module.exports = Company;

//Company has a HasManyRelation to Vaccine
/*Table B has a column that holds table A's id.
 This relationship is called a HasManyRelation in
 objection. We can say that A has many B's.*/