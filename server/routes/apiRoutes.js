import express from 'express';
import { getAllRecords, createRecord, deleteRecord } from '../controllers/dynamicController.js';

const router = express.Router();

router.get('/:model', getAllRecords);
router.post('/:model', createRecord);
router.delete('/:model/:id', deleteRecord);

export default router;
