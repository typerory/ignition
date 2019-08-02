module.exports = {


  friendlyName: 'View list of properties',


  description: 'Display "List of properties" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/properties/list-of-properties'
    }

  },


  fn: async function (inputs, exits) {

    var properties = [
      { id: 1,
        address: '6901 Holly Rd',
        author: {
          fullName: 'Rory Silva'
        },
      },
      { id: 2,
        address: '123 Main Street',
        author: {
          fullName: 'George Reynaud'
        },
      }
    ];

    // Respond with view.
    return exits.success({
      properties,
      currentSection: 'properties'
    }
    );

  }


};
