var hitobito = require('../controllers/hitobito'); // replace models with name of your controller file

module.exports = (app) => {
    // API routes here
    // example:
    app.get('/hitobito', (req, res) => hitobito.index(req, res));
    // CRUD routing examples
    // Create
    app.post('/hitobito', (req, res) => hitobito.create(req, res));
    // Read
    app.get('/hitobito/:id', (req, res) => hitobito.read(req, res));
    // Update
    app.put('/hitobito/:id', (req, res) => hitobito.update(req, res));
    // Destroy
    app.delete('/hitobito/:id', (req, res) => hitobito.destroy(req, res));
}