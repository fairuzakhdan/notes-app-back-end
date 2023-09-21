/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const { notes } = require('./notes');

// eslint-disable-next-line consistent-return
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const created = new Date().toISOString();
  const updated = created;

  const newNote = {
    title,
    tags,
    body,
    id,
    created,
    updated,
  };
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'succes',
      message: 'catatan berhasil dihapus',
      data: {
        noteid: id,
      },
    });
    response.header('Access-Control-Allow-Origin', '*');
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNoteByHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editbyIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const Updatedat = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      Updatedat,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal diperbarui,id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus,Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = {
  addNoteHandler, getAllNoteByHandler, getNoteByIdHandler, editbyIdHandler, deleteByIdHandler,
};
