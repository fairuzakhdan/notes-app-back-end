/* eslint-disable linebreak-style */
/* eslint-disable comma-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const {
  addNoteHandler, getAllNoteByHandler, getNoteByIdHandler,editbyIdHandler, deleteByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNoteByHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editbyIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteByIdHandler,
  },
];
module.exports = { routes };
