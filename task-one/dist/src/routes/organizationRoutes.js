"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var organizationController_1 = require("../controllers/organizationController");
var router = express_1.default.Router();
router.route('/').post(organizationController_1.createOrganization).get(organizationController_1.getAllOrganizations);
router
    .route('/:id')
    .get(organizationController_1.getOneOrganization)
    .put(organizationController_1.updateOrganization)
    .delete(organizationController_1.deleteOrganization);
exports.default = router;
