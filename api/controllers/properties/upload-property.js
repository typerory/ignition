module.exports = {


  friendlyName: 'Upload property',


  description: 'Upload info about a property.',


  files: ['photo'],


  inputs: {

    photo: {
      description: 'Upstream for an incoming file upload.',
      type: 'ref'
    },
    address: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    zip: {
      type: 'string',
    },
    purchasePrice: {
      type: 'number',
    },
    estimatedRehabAmount: {
      type: 'number',
    },
    DesiredNetCashflow: {
      type: 'number',
    },
    rent: {
      type: 'number',
    },
    otherIncome: {
      type: 'number',
    },
    mortgage: {
      type: 'number',
    },
    pmi: {
      type: 'number',
    },
    estimatedUtilities: {
      type: 'number',
    },
    estimatedInsurance: {
      type: 'number',
    },
    estimatedTax: {
      type: 'number',
    },

  },


  exits: {

    success: {
      outputDescription: 'The newly created `Property`.',
      outputExample: {}
    },

    noFileAttached: {
      description: 'No file was attached.',
      responseType: 'badRequest'
    },

    tooBig: {
      description: 'The file is too big.',
      responseType: 'badRequest'
    },

  },


  fn: async function ({photo, propertyData}) {

    var url = require('url');
    var util = require('util');

    // Upload the image.
    var info = await sails.uploadOne(photo, {
      maxBytes: 3000000
    })
    // Note: E_EXCEEDS_UPLOAD_LIMIT is the error code for exceeding
    // `maxBytes` for both skipper-disk and skipper-s3.
    .intercept('E_EXCEEDS_UPLOAD_LIMIT', 'tooBig')
    .intercept((err)=>new Error('The photo upload failed: '+util.inspect(err)));

    if(!info) {
      throw 'noFileAttached';
    }

    // Create a new "property" record.
    var newProperty = await Property.create({
      imageUploadFd: info.fd,
      imageUploadMime: info.type,
      address: propertyData.address,
      city: propertyData.city,
      state: propertyData.state,
      zip: propertyData.zip,
      purchasePrice: propertyData.purchasePrice,
      estimatedRehabAmount: propertyData.estimatedRehabAmount,
      desiredNetCashflow: propertyData.desiredNetCashflow,
      rent: propertyData.rent,
      otherIncome: propertyData.otherIncome,
      mortgage: propertyData.mortgage,
      pmi: propertyData.pmi,
      estimatedUtilities: propertyData.estimatedUtilities,
      estimatedInsurance: propertyData.estimatedInsurance,
      estimatedTax: propertyData.estimatedTax,
      owner: this.req.me.id
    }).fetch();

    var imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/properties/'+newProperty.id+'/photo');

    // Return the newly-created property, with its `imageSrc`
    return {
      id: newProperty.id,
      imageSrc
    };

  }


};
