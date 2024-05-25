import express from "express";
import {
    listDomains,
    createHostedZone,
    deleteHostedZone,updateDomain 
} from "../Controllers/DomainController.js"

const router = express.Router();

router.get("/domains", listDomains);
router.post("/createdomain",createHostedZone);
router.delete("/deletedomain/:hostedZoneId", deleteHostedZone);
router.put('/updatedomain/:hostedZoneId', updateDomain); 
export default router;
