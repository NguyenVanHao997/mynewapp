import { Request, RequestHandler, Response } from "express";
import { paginatePrisma } from "../utils/paginatePrisma";
import prisma from "../libs/prisma";

export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const result = await paginatePrisma(prisma.products, {
      page,
      limit,
      include: { categories: true },
    });

    res.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductByCategory: RequestHandler = async (req, res) => {
  try {
    const categoryId = req.query.category;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const where = categoryId ? { category_id: Number(categoryId) } : undefined;

    const [products, total] = await Promise.all([
      prisma.products.findMany({
        where,
        skip,
        take: limit,
        include: {
          categories: true,
        },
      }),
      prisma.products.count({
        where,
      }),
    ]);

    res.json({
      data: products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
