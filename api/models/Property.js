/**
 * Property.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    address: {
      type: 'string',
      required: true,
      example: '123 Main Street'
    },
    city: {
      type: 'string',
      example: 'Miami'
    },
    state: {
      type: 'string',
      example: 'Florida'
    },
    zip: {
      type: 'string',
      example: '33014'
    },
    purchasePrice: {
      type: 'number',
      example: '350000'
    },
    estimatedRehabAmount: {
      type: 'number',
      example: '25000'
    },
    desiredNetCashflow: {
      type: 'number',
      example: '1000'
    },
    rent: {
      type: 'number',
      example: '4000'
    },
    otherIncome: {
      type: 'number',
      example: '400'
    },
    mortgage: {
      type: 'number',
      example: '1800'
    },
    pmi: {
      type: 'number',
      example: '80'
    },
    estimatedUtilities: {
      type: 'number',
      example: '400'
    },
    estimatedInsurance: {
      type: 'number',
      example: '400'
    },
    estimatedTax: {
      type: 'number',
      example: '300'
    },
    imageUploadFd: {
      type: 'string',
      description: 'The Skipper file descriptor string uniquely identifying the uploaded image.',
      required: false
    },

    imageUploadMime: {
      type: 'string',
      description: 'The MIME type for the uploaded image.',
      required: false
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    owner: { model: 'User', description: 'The user who uploaded this item.' },


  },

};

