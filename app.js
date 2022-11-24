const express = require("express");
const { userInfo } = require("os");
const { send } = require("process");
const app = express();
const fs = require("fs").promises;
const { myF, readfile } = require("./info-folder");
app.use(express.json());
// const getSizeFolder = require('get-foder-size')

app.get("/", (req, res) => {
  myF("./usersfolder").then((e) => res.send(e));
});

app.get("/:folder/", (req, res) => {
  const { folder } = req.params;
  myF(`./usersfolder/${folder}`).then((e) => res.send(e));
});

app.get("/:folder/:filname", (req, res) => {
  const { folder, filname } = req.params;
  console.log(filname);
  if (!filname) {
    return myF(`./usersfolder/${folder}`).then((e) => res.send(e));
  } else
    return readfile(`./usersfolder/${folder}/${filname}`).then((e) =>
      res.send(e)
    );
});

app.put(`*`, (req, res) => {
  let url = req.url.split("/");
  url.pop();
  const renameFileAsync = async (oldDirName, newDirName) => {
    try {
      await fs.rename(oldDirName, newDirName);
      res.send(`sacses`);
      console.log("Directory renamed successfully.");
    } catch (err) {
      res.send(err);
    }
  };
  renameFileAsync(
    `/usersfolder${req.url}`,
    `/usersfolder${url.join("/")}/${req.body.name}`
  );
});

app.delete(`*`, (req, res) => {
  let url = req.url.split("/").pop();
  const split = url.split(".")[1];
  console.log(url);

  if (split) {
    console.log(split);
    fs.unlink(`/${url}`, (err) => {
      if (err) {
        return res.send("error occurred in deleting directory", err);
      }
      res.send("Directory deleted successfully");
    });
  } else console.log(`not split`);
  fs.rmdir(`/usersfolder/${url}`, (err) => {
    if (err) {
      return res.send("error occurred in deleting directory", err);
    }
    res.send("Directory deleted successfully");
  });
});

app.listen(5000, () => {
  console.log("i listen port 5000");
});
