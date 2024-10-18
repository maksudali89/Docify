import express from 'express';
const router  = express.Router();
import {HandlerForCreateNewDocument,HandlerForUpdateDocumentContent,HandlerForGettingDocumentForDisplay,HandlerForGetAllDocs,HandlerForDeleteDocument} from '../controllers/document.js'
router.post('/document',HandlerForCreateNewDocument);
router.post('/dcoUpdate',HandlerForUpdateDocumentContent);
router.get('/fetchDocs',HandlerForGettingDocumentForDisplay);
router.get('/AllDocs',HandlerForGetAllDocs);
router.delete('/deleteDocs',HandlerForDeleteDocument);
export default router ;