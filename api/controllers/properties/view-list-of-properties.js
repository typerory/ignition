module.exports = {


  friendlyName: 'View list of properties',


  description: 'Display "Properties" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/properties/list-of-properties'
    }

  },


  fn: async function () {

    var url = require('url');

    // Get the list of properties this user can see.
    var properties = await Property.find({
      or: [
        // Friend properties:
        { owner: { 'in': _.pluck(this.req.me.friends, 'id') } },
        // My properties:
        { owner: this.req.me.id }
      ]
    })
    .populate('owner');

    _.each(properties, (property)=> {
      property.imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/properties/'+property.id+'/photo');
      delete property.imageUploadFd;
      delete property.imageUploadMime;
    });

    // Respond with view.
    return {
      currentSection: 'properties',
      properties: properties,
    };

  }


};
