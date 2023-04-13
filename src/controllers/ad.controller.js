class AdController {
    async auth(req, res) {
        try {
            res.json(req.user)
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }
}

module.exports = AdController;
