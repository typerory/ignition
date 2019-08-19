parasails.registerPage('list-of-properties', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    properties: [],

    // The "virtual" portion of the URL which is managed by this page script.
    virtualPageSlug: '',

    // Form data
    uploadFormData: {
      photo: undefined,
      address: '',
      city: '',
      state: '',
      zip: '',
      purchasePrice: '',
      estimatedRehabAmount: '',
      desiredNetCashflow: '',
      rent: '',
      otherIncome: '',
      mortgage: '',
      pmi: '',
      estimatedUtilities: '',
      estimatedInsurance: '',
      estimatedTax: '',
      previewImageSrc: ''
    },

    // Modals which aren't linkable:
    confirmDeletePropertyModalOpen: false,

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',

    selectedProperty: undefined,

  },

  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: /^\/properties\/?([^\/]+)?/,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },

  mounted: function() {
    this.$find('[data-toggle="tooltip"]').tooltip();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    _clearUploadPropertyModal: function() {
      // Close modal
      this.goto('/properties');
      // Reset form data
      this.uploadFormData = {
        photo: undefined,
        address: '',
        city: '',
        state: '',
        zip: '',
        purchasePrice: '',
        estimatedRehabAmount: '',
        desiredNetCashflow: '',
        rent: '',
        otherIncome: '',
        mortgage: '',
        pmi: '',
        estimatedUtilities: '',
        estimatedInsurance: '',
        estimatedTax: '',
        previewImageSrc: ''
      };
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    clickAddButton: function() {
      // Open the modal.
      this.goto('/properties/new');
    },

    closeUploadPropertyModal: function() {
      this._clearUploadPropertyModal();
    },

    handleParsingUploadPropertyForm: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.uploadFormData;

      if(!argins.photo) {
        this.formErrors.photo = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return _.omit(argins, ['previewImageSrc']);
    },

    submittedUploadPropertyForm: function(result) {
      var newItem = _.extend(result, {
        address: this.uploadFormData.address,
        city: this.uploadFormData.city,
        state: this.uploadFormData.state,
        zip: this.uploadFormData.zip,
        purchasePrice: this.uploadFormData.purchasePrice,
        estimatedRehabAmount: this.uploadFormData.estimatedRehabAmount,
        desiredNetCashflow: this.uploadFormData.desiredNetCashflow,
        rent: this.uploadFormData.rent,
        otherIncome: this.uploadFormData.otherIncome,
        mortgage: this.uploadFormData.mortgage,
        pmi: this.uploadFormData.pmi,
        estimatedUtilities: this.uploadFormData.estimatedUtilities,
        estimatedInsurance: this.uploadFormData.estimatedInsurance,
        estimatedTax: this.uploadFormData.estimatedTax,
        owner: {
          id: this.me.id,
          fullName: this.me.fullName
        }
      });

      // Add the new property to the list
      this.properties.unshift(newItem);

      // Close the modal.
      this._clearUploadPropertyModal();
    },

    changeFileInput: function(files) {
      if (files.length !== 1 && !this.uploadFormData.photo) {
        throw new Error('Consistency violation: `changeFileInput` was somehow called with an empty array of files, or with more than one file in the array!  This should never happen unless there is already an uploaded file tracked.');
      }
      var selectedFile = files[0];

      // If you cancel from the native upload window when you already
      // have a photo tracked, then we just avast (return early).
      // In this case, we just leave whatever you had there before.
      if (!selectedFile && this.uploadFormData.photo) {
        return;
      }

      this.uploadFormData.photo = selectedFile;

      // Set up the file preview for the UI:
      var reader = new FileReader();
      reader.onload = (event)=>{
        this.uploadFormData.previewImageSrc = event.target.result;

        // Unbind this "onload" event.
        delete reader.onload;
      };
      // Clear out any error messages about not providing an image.
      this.formErrors.photo = false;
      reader.readAsDataURL(selectedFile);

    },

    clickDeleteProperty: function(propertyId) {
      this.selectedProperty = _.find(this.properties, {id: propertyId});

      // Open the modal.
      this.confirmDeletePropertyModalOpen = true;
    },

    closeDeletePropertyModal: function() {
      this.selectedProperty = undefined;
      this.confirmDeletePropertyModalOpen = false;
      this.cloudError = '';
    },

    handleParsingDeletePropertyForm: function() {
      return {
        id: this.selectedProperty.id
      };
    },

    submittedDeletePropertyForm: function() {

      // Remove the property from the list
      _.remove(this.properties, {id: this.selectedProperty.id});

      // Close the modal.
      this.selectedProperty = undefined;
      this.confirmDeletePropertyModalOpen = false;
    },

  }
});
