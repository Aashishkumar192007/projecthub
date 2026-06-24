import prisma from '../config/db.js';

const modelMap = {
  properties: 'property',
  construction: 'constructionProject',
  warehouses: 'warehouse',
  employees: 'employee',
  attendance: 'attendance',
  visitors: 'visitor',
  vendors: 'vendor',
  inventory: 'inventory',
  equipment: 'equipment',
  budget: 'budget',
  documents: 'document',
  guarantors: 'guarantor',
  commissions: 'commission'
};

export const getAllRecords = async (req, res) => {
  const { model } = req.params;
  try {
    const prismaModel = modelMap[model];
    if (!prismaModel || !prisma[prismaModel]) {
      return res.status(404).json({ error: `Model ${model} not found` });
    }
    const data = await prisma[prismaModel].findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const createRecord = async (req, res) => {
  const { model } = req.params;
  try {
    const prismaModel = modelMap[model];
    if (!prismaModel || !prisma[prismaModel]) {
      return res.status(404).json({ error: `Model ${model} not found` });
    }
    const newData = await prisma[prismaModel].create({
      data: req.body
    });
    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecord = async (req, res) => {
  const { model, id } = req.params;
  try {
    const prismaModel = modelMap[model];
    if (!prismaModel || !prisma[prismaModel]) {
      return res.status(404).json({ error: `Model ${model} not found` });
    }
    await prisma[prismaModel].delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
