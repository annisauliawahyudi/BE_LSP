const express = require("express");
const router = express.Router();
const { authMiddleware, restrictTo } = require("../middleware/authMiddleware");
const { register, login } = require("../controllers/authController");
const {
  getSkema,
  getIdSkema,
  storeSkema,
  updateSkema,
  deleteSkema,
  getJenisSkema,
  getModeSkema
} = require("../controllers/skemaController");
const {
  getUnits,
  getUnitById,
  getUnitBySkemaId,
  getJudulUnit,
  storeUnit,
  updateUnit,
  deleteUnit,
} = require("../controllers/unitController");
const {
  getAllElemen,
  getElemenById,
  getElemenByUnitId,
  storeElemen,
  editElemen,
  deleteElemen,
} = require("../controllers/elemenController");
const {
  getAllKUKs,
  storeKUK,
  createKUK,
  updateKUK,
  deleteKUK,
} = require("../controllers/KUKcontroller");
const {
  getAllKP,
  createKP,
  getOneKP,
  updateKP,
  deleteKP

} = require("../controllers/KelPekerjaanController");

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.get("/login", login);

// Admin-only route
router.get("/admin", authMiddleware, restrictTo("admin"), (req, res) => {
  res.send("Welcome Admin");
});

// Asesor-only route
router.get("/asesor", authMiddleware, restrictTo("asesor"), (req, res) => {
  res.send("Welcome Asesor");
});

// Asesi-only route
router.get("/asesi", authMiddleware, restrictTo("asesi"), (req, res) => {
  res.send("Welcome Asesi");
});

// Rute untuk Skema
router.get("/skema", authMiddleware, getSkema); // Mengambil semua skema
router.get("/skema/:id", authMiddleware, getIdSkema); // Mengambil skema berdasarkan ID
router.post("/skema", authMiddleware, restrictTo("admin"), storeSkema); // Menyimpan skema baru
router.put("/skema/:id", authMiddleware, restrictTo("admin"), updateSkema); // Memperbarui skema
router.delete("/skema/:id", authMiddleware, restrictTo("admin"), deleteSkema); // Menghapus skema
router.get("/jenisSkema", authMiddleware, getJenisSkema);
router.get("/modeSkema", authMiddleware, getModeSkema);

// Rute untuk Unit
router.get("/unit", authMiddleware, getUnits); // Mengambil semua unit
router.get("/unit/:id", authMiddleware, getUnitById); // Mengambil unit berdasarkan ID
router.get("/skema/unit/:skema_id", authMiddleware, getUnitBySkemaId);
// router.post("/unit", authMiddleware, restrictTo("admin"), storeUnit); // Menyimpan unit baru
router.post("/unit/create/:skema_id", authMiddleware, restrictTo("admin"), storeUnit);
router.put("/unit/:id", authMiddleware, restrictTo("admin"), updateUnit); // Memperbarui unit
router.delete("/unit/:id", authMiddleware, restrictTo("admin"), deleteUnit); // Menghapus unit
router.get("/judulUnit", authMiddleware, getJudulUnit);

// Rute untuk Elemen
router.get("/elemen", authMiddleware, getAllElemen); // Mengambil semua elemen
router.get("/unit/elemen/:unit_id", authMiddleware, getElemenByUnitId); // mengambil elemen per unit
router.get("/elemen/:id", authMiddleware, getElemenById); // Mengambil elemen berdasarkan ID
// router.post("/elemen", authMiddleware, restrictTo("admin"), storeElemen); // Menyimpan elemen baru
router.post("/elemen/create/:unit_id", authMiddleware, restrictTo("admin"), storeElemen); 
router.put("/elemen/:id", authMiddleware, restrictTo("admin"), editElemen); // Memperbarui elemen
router.delete("/elemen/:id", authMiddleware, restrictTo("admin"), deleteElemen); // Menghapus elemen

// Rute untuk KUK
router.get("/kuks", authMiddleware, getAllKUKs); // Mengambil semua KUK
// router.post("/kuks", authMiddleware, restrictTo("admin"), storeKUK); // Membuat KUK baru
router.post("/kuks", authMiddleware, restrictTo("admin"), createKUK); // Membuat KUK baru
router.put("/kuks/:id", authMiddleware, restrictTo("admin"), updateKUK); // Memperbarui KUK
router.delete("/kuks/:id", authMiddleware, restrictTo("admin"), deleteKUK); // Menghapus KUK

// rute untuk kelpekerjaan
router.get("/kelompok-pekerjaan", authMiddleware, getAllKP);
router.post("/kelompok-pekerjaan", authMiddleware, restrictTo("admin"), createKP);
router.put("/kelompok-pekerjaan/:id", authMiddleware, restrictTo("admin"), updateKP);
router.delete("/kelompok-pekerjaan/:id", authMiddleware, restrictTo("admin"), deleteKP);

module.exports = router;
