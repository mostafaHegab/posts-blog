const router = require("express").Router();
const multer = require("multer");

const authGuard = require("../guards/auth.guard");
const postsCtrl = require("../controllers/posts.controller");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images/");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    })
});

router.get("/", postsCtrl.getUserPosts);

router.post(
    "/add",
    upload.single("image"),
    postsCtrl.addPost
);

router.get("/:id", postsCtrl.getPostDetails);

module.exports = router;
