import { Company } from "../models/company.model.js"

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body
        if (!companyName) {
            return res.status(400).json({
                message: 'Company name is required',
                success: false
            })
        }
        let company = await Company.findOne({name: companyName})
        if (company) {
            return res.status(400).json({
                message: 'You cannot register existing company name',
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userID: req.id

        })
        return res.status(201).json({
            message: 'Company registered successfully',
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompany = async (req, res) => {
    try {
        const userID = req.id
        const companies = await Company.find({userID})
        if (!companies) {
            return res.status(404).json({
                message: 'Companies not found',
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompanyByID = async (req, res) => {
    try {
        const companyID = req.params.id
        const company = await Company.findById(companyID)
        if (!company) {
            return res.status(404).json({
                message: 'Company not found',
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, location} = req.body
        const file = req.file 

        const updateData = {name, description, website, location}

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true})

        if (!company) {
            return res.status(400).json({
                message: 'Company not found',
                success: false
            })
        }
        return res.status(200).json({
            message: 'Company information updated',
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}