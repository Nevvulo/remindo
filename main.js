const { app, BrowserWindow } = require("electron")
let win

async function initialize() {
	win = new BrowserWindow({width: 800, height: 600})
	win.loadFile("index.html")
	win.webContents.openDevTools()

	win.on("closed", () => { win = null })
}

app.on("ready", initialize)

// When all windows on the application are closed
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit()
})

app.on("activate", () => {
	if (win === null) initialize()
})

process.on("unhandledRejection", console.error)

