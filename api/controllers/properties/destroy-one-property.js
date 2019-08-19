module.exports = {


  friendlyName: 'Destroy one property',


  description: 'Delete a property.',


  inputs: {

    id: {
      description: 'The id of the property to destroy',
      type: 'number',
      required: true
    },

  },


  exits: {

    notFound: {
      responseType: 'notFound'
    },

    forbidden: {
      responseType: 'forbidden'
    },

  },


  fn: async function ({id}) {

    var propertyToDestroy = await Property.findOne({ id });
    // Ensure the property still exists.
    if(!propertyToDestroy) {
      throw 'notFound';
    }
    // Verify permissions.
    if(propertyToDestroy.owner !== this.req.me.id) {
      throw 'forbidden';
    }

    // Archive the record.
    await Property.archiveOne({ id });

  }

};
