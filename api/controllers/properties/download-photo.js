module.exports = {


  friendlyName: 'Download photo',


  description: 'Download a photo of a property.',


  inputs: {

    id: {
      description: 'The id of the item whose photo we\'re downloading.',
      type: 'number',
      required: true
    }

  },


  exits: {

    success: {
      outputDescription: 'The streaming bytes of the specified property\'s photo.',
      outputType: 'ref'
    },

    forbidden: { responseType: 'forbidden' },

    notFound: { responseType: 'notFound' }

  },


  fn: async function ({id}) {

    var property = await Property.findOne({id});
    if (!property) { throw 'notFound'; }

    // Check permissions.
    // (So people can't see images of properties that isn't from their friends or themselves.)
    var itemBelongsToFriend = _.any(this.req.me.friends, {id: property.owner});
    if (this.req.me.id !== property.owner && !itemBelongsToFriend) {
      throw 'forbidden';
    }

    this.res.type(property.imageUploadMime);


    var downloading = await sails.startDownload(property.imageUploadFd);

    return downloading;

  }


};
