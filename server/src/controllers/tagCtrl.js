const uniqid = require("uniqid");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "photoshare",
  password: "password",
  port: 5432,
});

const createTag = async (tag_id, tag_text) => {
  await pool.query(
    `INSERT INTO tag(tag_id, tag_text)
      VALUES ('${tag_id}', '${tag_text}')`,
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );
};

const tagCtrl = {
  getAllTags: async (req, res) => {
    await pool.query("SELECT * FROM phototags", (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result.rows);
    });
  },
  getTagsOnPostId: async (req, res) => {
    const photo_id = req.params.id;
    await pool.query(
      `SELECT DISTINCT tag.tag_id FROM phototags, tag WHERE photo_id = '${photo_id}'`,
      (err, result) => {
        res.status(200).json(result.rows);
      }
    );
  },
  createTagOnPhoto: async (req, res) => {
    const { photo_id, tag_text } = req.body;
    const phototag_id = uniqid();
    const tag_id = uniqid();
    await createTag(tag_id, tag_text);
    await pool.query(
      pool.query(
        `INSERT INTO phototags(phototag_id, photo_id, tag_id)
          VALUES('${phototag_id}', '${photo_id}', '${tag_id}')`,
        (err, result) => {
          if (err) {
            throw err;
          }
          res.status(200).send("photo added successfully");
        }
      )
    );
  },
};

module.exports = tagCtrl;
