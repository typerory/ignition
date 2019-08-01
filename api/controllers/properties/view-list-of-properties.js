module.exports = {


  friendlyName: 'View list of properties',


  description: 'Display "List of properties" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/properties/list-of-properties'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
