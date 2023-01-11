import Category from '../models/category.js';
import slugify from 'slugify';

export const create = async (req, res) => {
    try {
        const { name } = req.body;

        // validations
        if(!name.trim()) {
            return res.json({ error: "Name is required" })
        }

        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            return res.json({ error: "Category already exists" })
        }

        // save category after validations
        const category = await new Category({ name, slug: slugify(name) }).save()
        res.json(category)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

export const update = async (req, res) => {
    try {
        const { name } = req.body
        const { categoryId } = req.params
        const category = await Category.findByIdAndUpdate(categoryId, {
            name, 
            slug: slugify(name),
        },
        { new: true }
        )
        res.json({ updated_category: category })
    } catch (err) {
        console.log(err)
        return res.status(400).json(err.message)
    }
}

export const remove = async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId)
        res.json({ removed_category: removed })
    } catch (err) {
        console.log(err)
        return res.status(400).json(err.message)
    }
}

export const getAll = async (req, res) => {
    try {
        const all = await Category.find({})
        res.json({ all_categories: all })
    } catch (err) {
        console.log(err)
        return res.status(400).json(err.message)
    }
}

export const getById = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug })
        res.json(category)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err.message)
    }
}

// QUE HACE SLUGIFY?
// Si nosotros le pasamos como nombre a una categoría, por ejemplo, "Ropa De Hombre", va a guardar en "slug" --> "ropa-de-hombre".