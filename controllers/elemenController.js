const { Elemen, KUK, Unit, JudulUnit } = require('../models');

// Fungsi untuk mengirim respons
const sendResponse = (res, status, message, data) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

// Mengambil semua elemen
exports.getAllElemen = async (req, res) => {
  try {
    const elemen = await Elemen.findAll({
       include: [
          {
            model: KUK,
            as: 'kuks', // Pastikan ini sesuai dengan alias di model Elemen
            attributes: ['id', 'namaKriteria'],
          },
        ],
    });
    return sendResponse(res, 200, 'Data Retrieved Successfully', elemen);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal Server Error', error.message || error);
  }
};

//  mengambil elemen berdasarkan unit
exports.getElemenByUnitId = async (req, res) => {
  try {
    const unit_id = req.params.unit_id;

    const elemen = await Elemen.findAll({
       where: { unit_id: unit_id },
       include: [
         {
            model: Unit,
            as: 'unit', // Alias untuk Unit
            attributes: ['id', 'judul_unit_id'], // Menyertakan judul_unit_id
            include: [
                {
                    model: JudulUnit, // Model yang memiliki informasi judul_unit
                    as: 'judul_unit', // Alias untuk model JudulUnit
                    attributes: ['judul_unit'], // Menyertakan judul_unit
                },
            ],
        },
          {
            model: KUK, 
            as: 'kuks', // Pastikan ini sesuai dengan alias di model Elemen
            attributes: ['id', 'namaKriteria'],
          },
        ],
    });

    if (elemen.length === 0) {
      return sendResponse(res, 404, 'No elemens found for this unit', null);
    }

    return sendResponse(res, 200, 'Data Retrieved Successfully', elemen);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal Server Error', error.message || error);
  }
};


// Menyimpan elemen baru
exports.storeElemen = async (req, res) => {
  const { unit_id } = req.params; 
  const { nama_elemen } = req.body;

  // Validasi input
  if (!nama_elemen) {
    return sendResponse(res, 400, 'Nama elemen is required');
  }

  try {
    const newElemen = await Elemen.create({ 
      nama_elemen, 
      unit_id 
    });
    return sendResponse(res, 201, 'Elemen Created Successfully', newElemen);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 400, 'Bad Request', error.message || error);
  }
};

// Mengambil elemen berdasarkan ID
exports.getElemenById = async (req, res) => {
  const { id } = req.params;

  try {
    const elemen = await Elemen.findByPk(id);
    if (!elemen) {
      return sendResponse(res, 404, 'Elemen not found');
    }
    return sendResponse(res, 200, 'Data Retrieved Successfully', elemen);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal Server Error', error.message || error);
  }
};

// Menyimpan elemen baru
// exports.storeElemen = async (req, res) => {
//   const { nama_elemen, unit_id } = req.body;

//   // Validasi input
//   if (!nama_elemen) {
//     return sendResponse(res, 400, 'Nama elemen is required');
//   }

//   try {
//     const newElemen = await Elemen.create({ nama_elemen, unit_id });
//     return sendResponse(res, 201, 'Elemen Created Successfully', newElemen);
//   } catch (error) {
//     console.error(error);
//     return sendResponse(res, 400, 'Bad Request', error.message || error);
//   }
// };

// Memperbarui elemen
exports.editElemen = async (req, res) => {
  const { id } = req.params;
  const { nama_elemen } = req.body;

  // Validasi input
  if (!nama_elemen) {
    return sendResponse(res, 400, 'Nama elemen is required');
  }

  try {
    const elemen = await Elemen.findByPk(id);
    if (!elemen) {
      return sendResponse(res, 404, 'Elemen not found');
    }

    elemen.nama_elemen = nama_elemen;
    await elemen.save();
    return sendResponse(res, 200, 'Elemen updated successfully', elemen);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Error updating elemen', error.message || error);
  }
};

// Menghapus elemen
exports.deleteElemen = async (req, res) => {
  const { id } = req.params;

  try {
    const elemen = await Elemen.findByPk(id);
    if (!elemen) {
      return sendResponse(res, 404, 'Elemen not found');
    }

    await elemen.destroy();
    return sendResponse(res, 200, 'Elemen deleted successfully', elemen); // Mengembalikan data elemen yang dihapus
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Error deleting elemen', error.message || error);
  }
};
