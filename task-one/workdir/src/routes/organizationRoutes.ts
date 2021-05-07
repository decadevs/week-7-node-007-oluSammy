import express from 'express';
import {
  createOrganization,
  getOneOrganization,
  getAllOrganizations,
  updateOrganization,
  deleteOrganization,
} from '../controllers/organizationController';

const router = express.Router();

router.route('/').post(createOrganization).get(getAllOrganizations);
router
  .route('/:id')
  .get(getOneOrganization)
  .put(updateOrganization)
  .delete(deleteOrganization);

export default router;
