import { Request, Response, NextFunction } from 'express';
import * as scanService from '../services/scans';

export const createScan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.kullanici!.id;
    const { targetId, configurationId } = req.body;
    
    // هذه الدالة الآن تضيف المهمة إلى قائمة الانتظار بفضل التعديلات في ملف الخدمة
    const scan = await scanService.initiateScan(userId, targetId, configurationId);
    
    // --- بداية التعديل ---
    // تم تغيير الرسالة لتكون أكثر دقة وتوضح أن الفحص تم وضعه في قائمة الانتظار
    res.status(201).json({
      message: 'Scan successfully queued for execution.',
      data: scan,
    });
    // --- نهاية التعديل ---

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
