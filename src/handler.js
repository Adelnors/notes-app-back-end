const { nanoid } = require("nanoid");
const notes = require("./notes");


const addNotesHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16); // const { id } = nanoid(16); Bawaanya gitu, tapi malah undefined
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNotes = {
        title, tags, body, id, createdAt, updatedAt,
    }

    notes.push(newNotes);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        console.log(notes);
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;

};


const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});


const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    // dapatkan dulu nilai id dari request.params.

    const note = notes.filter((n) => n.id === id)[0];
    //dapatkan objek note dengan id tersebut dari objek array notes
    //Manfaatkan method array filter() untuk mendapatkan objeknya.

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


const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);
    // Pertama, dapatkan dulu index array pada objek catatan sesuai id yang ditentukan.
    // Untuk melakukannya, gunakanlah method array findIndex().

    //Bila note dengan id yang dicari ditemukan, index akan bernilai array index dari objek catatan yang dicari. 
    //Namun, bila tidak ditemukan, index akan bernilai -1.

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        console.log(notes);
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;

};


const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        console.log('Notes Deleted');
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { addNotesHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };