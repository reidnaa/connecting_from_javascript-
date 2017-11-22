exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("milestones", table => {
      table.integer("famous_person_id");
      table.foreign("famous_person_id").references("id").inTable("famous_people");
    })
  ])
};

exports.down = function(knex, Promise) {
    return knex.schema.table('milestones', function(t) {
        t.dropColumn('famous_person_id');
    });
};