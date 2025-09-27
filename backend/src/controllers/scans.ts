import { Request, Response, NextFunction } from 'express';
// --- التعديل هنا ---
import * as scanService from '../services/scans';

export const createScan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.kullanici!.id;
    const { targetId, configurationId } = req.body;
    const scan = await scanService.initiateScan(userId, targetId, configurationId);
    res.status(201).json({
      message: 'Scan initiated successfully. It is now pending execution.',
      data: scan,
    });
  } catch (error) {
    next(error);
  }
};

export const getScan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.kullanici!.id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Scan ID is required in the URL path' });
    }

    const scan = await scanService.getScanById(userId, id);
    res.status(200).json({ data: scan });
  } catch (error) {
    next(error);
  }
};

export const listScans = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.kullanici!.id;
    const organizationId = req.query.organizationId as string;
    const scans = await scanService.listScansForOrg(userId, organizationId);
    res.status(200).json({ data: scans });
  } catch (error) {
    next(error);
  }
};
