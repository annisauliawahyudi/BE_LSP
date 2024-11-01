const { KUK, Elemen, Unit, JudulUnit } = require("../models");

// Mengambil semua KUK
exports.getAllKUKs = async (req, res) => {
  try {
    const kuks = await KUK.findAll({
      include: [
        {
          model: Elemen,
          as: "elemen",
          attributes: ["id", "nama_elemen"],
        },
        {
          model: Unit,
          as: "unit",
          attributes: ["id", "judul_unit_id"], // Menyertakan judul_unit_id
          include: [
            {
              model: JudulUnit, // Model yang memiliki informasi judul_unit
              as: "judul_unit", // Alias untuk model JudulUnit
              attributes: ["judul_unit"], // Menyertakan judul_unit
            },
          ],
        },
      ],
    });
    return res.status(200).json({
      status: 200,
      message: "KUKs retrieved successfully",
      data: kuks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Error fetching KUKs",
      error: error.message || error,
    });
  }
};

// Membuat KUK baru
// Membuat KUK baru
exports.getKuksByElemenId = async (req, res) => {
    try {
      const elemen_id = req.params.elemen_id; 
      const kuks = await KUK.findAll({
        where: { elemen_id: elemen_id },
        include: [
          {
            model: Elemen,
            as: "elemen",
            attributes: ["id", "nama_elemen"],
          },
          {
            model: Unit,
            as: "unit",
            attributes: ["id", "judul_unit_id"], // Menyertakan judul_unit_id
            include: [
              {
                model: JudulUnit, // Model yang memiliki informasi judul_unit
                as: "judul_unit", // Alias untuk model JudulUnit
                attributes: ["judul_unit"], // Menyertakan judul_unit
              },
            ],
          },
        ],
      });

      if (kuks.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No kuks found for this elemen",
          data: null,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "KUKs retrieved successfully",
        data: kuks,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: "Error fetching KUKs",
        error: error.message || error,
      });
    }
  };

// Membuat KUK baru
exports.createKUK = async (req, res) => {
  
  try {
    const { elemen_id } = req.params;
    const { namaKriteria } = req.body; // Ambil semua data dari request body
    // Buat KUK baru dengan unit dan elemen yang diberikan
    const newKUK = await KUK.create({ 
        namaKriteria, 
        elemen_id
    });
    return res.status(201).json({
      status: 201,
      message: "KUK created successfully",
      data: newKUK,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: "Error creating KUK",
      error: error.message || error,
    });
  }
};

// exports.storeKUK = async (req, res) => {
//   const { namaKriteria, elemen_id, unit_id } = req.body;

//   // Validasi input
//   if (!namaKriteria) {
//     return sendResponse(res, 400, 'namaKriteria is required');
//   }
//   if (!unit_id) {
//     return sendResponse(res, 400, 'unit_id is required');
//   }
//   if (!elemen_id) {
//     return sendResponse(res, 400, 'elemen_id is required');
//   }

//   try {
//     const newKUK = await KUK.create({ namaKriteria, elemen_id, unit_id });
//     return sendResponse(res, 201, 'KUK Created Successfully', newKUK);
//   } catch (error) {
//     console.error(error);
//     return sendResponse(res, 400, 'Bad Request', error.message || error);
//   }
// };

// Memperbarui KUK
exports.updateKUK = async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await KUK.update(req.body, { where: { id } });

    if (updated) {
      const updatedKUK = await KUK.findByPk(id);
      return res.status(200).json({
        status: 200,
        message: "KUK updated successfully",
        data: updatedKUK,
      });
    }
    return res.status(404).json({
      status: 404,
      message: "KUK not found",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: "Error updating KUK",
      error: error.message || error,
    });
  }
};

// Menghapus KUK
exports.deleteKUK = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await KUK.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({
        status: 200,
        message: "KUK deleted successfully",
      });
    }
    return res.status(404).json({
      status: 404,
      message: "KUK not found",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: "Error deleting KUK",
      error: error.message || error,
    });
  }
};
