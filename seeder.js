import mongoose from 'mongoose'
import express from "express"
import colors from 'colors'
import products from "./data/products.js"
import users from "./data/user.js"
import dotenv from "dotenv"
import connectDB from './config/db.js'
import User from './models/userSchema.js'
import Product from './models/productSchema.js'
import Order from './models/orderSchema.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createUsers = await User.insertMany(users)

        const adminUser = createUsers[0]

        const sampleProducts = products.map(product => {
            return {...product, user : adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log("Data Imported".green.inverse)
        process.exit()
    } catch (error) {
        console.error(`Error : ${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log("Data destroyed".red.inverse)
        process.exit()
    } catch (error) {
        console.error(`Error : ${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === "-d"){
    destroyData()
} else {
    importData()
}