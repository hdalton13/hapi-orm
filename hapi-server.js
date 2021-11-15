// Configure Knex.
//Heather Dalton
//11/12/2021
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "pg.cse.taylor.edu",
    user: "heather_dalton",
    password: "kivaxida",
    database: "heather_dalton",
  },
});

// Configure Objection.
const { Model } = require("objection");
//const { Joi } = require("Joi");
Model.knex(knex);

// Load model classes.
const Company = require("./models/Company");
const Patient = require("./models/Patient");
const Vaccination = require("./models/Vaccination");
const Vaccine = require("./models/Vaccine");

// Configure Hapi.
const Hapi = require("@hapi/hapi");
const Boom = require("@hapi/boom");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
  });

  // Log stuff.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
    },
  });
  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request, h) => "Hello, Hapi",
    },
    {
      method: "GET",
      path: "/patients",
      handler: (request, h) => Patient.query(),
    },
    //Retrieve (5.2)
    {
      method: "GET",
      path: "/companies",
      handler: (request, h) => {
        return Company.query().withGraphFetched("vaccines");
      },
    },
    {
      method: "GET",
      path: "/patients/{id}",
      handler: (request, h) => {
        const id_Key = request.params.id;
        return Patient.query().where("id", id_Key).first();
      },
    },
    {//vaccines
      method: "GET",
      path: "/vaccines",
      handler: (request, h) => {
        return Vaccine.query().withGraphFetched("companies");
      }
    }, /**/

   //Create (5.1)
    {
      method:"POST",
      path: "/patients",
      config: {
        description: 'Create patient',
      },
      handler: (request, h) => {
        return Patient.query().insert(request.payload);
      }

    },
    {
      method:"POST",
      path: "/patients/{pid}/vaccines/{vid}",
      config: {
        description: 'Create patient',
      },
      handler: (request, h)=> {
        const pid_Key = request.params.pid;
        const vid_Key = request.params.vid;
        return Vaccination.query().insert(request.payload)
      }
    },
//Update (5.3)
    {
      method:"PUT",
      path: '/patients/{id}',
      config:{
        description:'Replace the patient information',
      },//end config
      handler: async (request, h) => {
        const rowsUpdated = await Patient.query()
            .update(request.payload)
            .where('id', request.params.patient_id);
        return {updated: rowsUpdated};
      }
    },    //end entire method


    /*//Delete (5.4)
    {
      method: 'DELETE',
      path: '/patients/{pid}/vaccines/{vid}',
      config: {
        description: 'Delete a combination',
        validate:{
          params:{
            patients_id: Joi.number().integer.min(0).required,
            vaccine_id: Joi.number().integer.min(0).required
          }
        }
      },
      handler: async (request, h) => {
        const rowsDeleted = await knex()
            .select('patient_id', 'vaccine_id')
            .from('patient', 'vaccine')
            .delete()
            .where('patient_id', request.params.pid)
            .andWhere('vaccine_id', request.params.vid);
        if (rowsDeleted == 1) {return {deleted: rowsDeleted}}
        else { return Boom.notFound(`Query returned ${rowsDeleted} rows`) };
      }
    }

     */
  ]); //end of server.route

  console.log("Server listening on", server.info.uri);
  await server.start();
};

init();
