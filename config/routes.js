/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage-or-redirect' },
  'GET /friends/:virtualPageSlug?':    { action: 'friends/view-friends' },
  'GET /things/:virtualPageSlug?':     { action: 'things/view-available-things' },

  'GET /faq':                { view:   'pages/faq' },
  'GET /legal/terms':        { view:   'pages/legal/terms' },
  'GET /legal/privacy':      { view:   'pages/legal/privacy' },
  'GET /contact':            { view:   'pages/contact', locals: { currentSection: 'contact' }},

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { view:   'pages/entrance/confirmed-email' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },

  'GET /claim-account':      { action: 'entrance/view-claim-account' },

  'GET /properties/:virtualPageSlug?':   { action: 'properties/view-list-of-properties'},
  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the CloudSDK library.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },

  'PUT   /api/v1/entrance/login':                         { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                        { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email':  { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':     { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/entrance/claim-account-and-login':       { action: 'entrance/claim-account-and-login' },

  'POST  /api/v1/deliver-contact-form-message':       { action: 'deliver-contact-form-message' },

  'POST  /api/v1/things':                             { action: 'things/upload-thing' },
  'DELETE  /api/v1/things/:id':                       { action: 'things/destroy-one-thing' },
  'PUT   /api/v1/things/:id/borrow':                  { action: 'things/borrow-thing' },
  'GET   /api/v1/things/:id/photo':                   { action: 'things/download-photo', skipAssets: false },
  'PUT   /api/v1/things/:id/schedule-return':         { action: 'things/schedule-return', skipAssets: false },
  'PATCH /api/v1/things/:id':                         { action: 'things/update-one-thing', skipAssets: false },

  'DELETE  /api/v1/friends/:id':                      { action: 'friends/remove-friend' },
  'POST   /api/v1/friends':                           { action: 'friends/add-friends' },
  'PUT    /api/v1/approve-friend':                    { action: 'friends/approve-friend' },

  'POST  /api/v1/properties':                         { action: 'properties/upload-property' },
  'DELETE  /api/v1/properties/:id':                   { action: 'properties/destroy-one-property' },
  'GET   /api/v1/properties/:id/photo':               { action: 'properties/download-photo', skipAssets: false },


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',

};
