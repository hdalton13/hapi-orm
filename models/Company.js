//Heather Dalton
//11/12/2021
const { Model } = require("objection");

class Company extends Model {
  static tableName = "company";

  static relationMappings = {
    vaccines: {
      relation: Model.HasManyRelation,
      modelClass: require("./Vaccine"),
      join: {
        from: "company.id",
        to: "vaccine.company_id",
      }, //end join
    }, //end vaccine
  }; //end relation
} //end class

module.exports = Company;

//Company has a HasManyRelation to Vaccine
/*Table B has a column that holds table A's id.
 This relationship is called a HasManyRelation in
 objection. We can say that A has many B's.*/
