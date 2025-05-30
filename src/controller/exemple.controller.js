import { runSecuredAction } from '../services/exemple.service.js';

const securedExemple = async (req, res) => {
    const result = runSecuredAction();
    res.status(200).json(result);
};

export default { securedExemple };