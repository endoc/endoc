const pug = require('pug')
const path = require('path')
const pdf = require('html-pdf')
const CheckIn = require('../check-in.model')

var pdfOptions = { format: 'Letter' }

function getHtml (data) {
  path.join(__dirname, 'templates/templates.pug')
  const compiledFunction = pug.compileFile(path.join(__dirname, './../../../../templates/template.pug'))
  return compiledFunction(data)
}

module.exports = {
  pdf: async function (req, res) {
    try {
      const _check_in_id = req.params.check_in_id
      const _check_in = await CheckIn.findById(_check_in_id).exec()
      const html = getHtml(_check_in)
      await pdf.create(html, pdfOptions).toStream(function (err, stream) {
        if (err) { }
        stream.on('end', () => { return res.end() })
        stream.pipe(res)
      })
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename=endoc.pdf')
      // res.send(result)
    } catch (error) {
      res.send(error)
    }
  },

  html: async function (req, res) {
    try {
      const _check_in_id = req.params.check_in_id
      const _check_in = await CheckIn.findById(_check_in_id).exec()
      const html = getHtml(_check_in)
      res.setHeader('Content-Disposition', 'attachment; filename=endoc.html')
      res.send(html)
    } catch (error) {
      res.send(error)
    }
  }
}
