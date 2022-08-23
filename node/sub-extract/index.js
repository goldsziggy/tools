const {
  promises: { readdir },
  readdirSync,
  copyFileSync,
} = require("fs")

const DIRNAME = __dirname + "/subs"
const TRACKNAME = "track5"

const getDirectories = async (source) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const runtime = async () => {
  const dirs = await getDirectories(DIRNAME)
  console.log(dirs)
  dirs.forEach((dir) => {
    readdirSync(DIRNAME + "/" + dir, { withFileTypes: true }).forEach((file) => {
      console.log(file)
      if (file.name && file.name.includes(TRACKNAME)) {
        copyFileSync(DIRNAME + "/" + dir + "/" + file.name, DIRNAME + "/" + dir + "." + file.name)
      }
    })
  })
}

runtime()
