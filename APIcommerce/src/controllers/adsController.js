const Category = require("../models/Category")
const User = require("../models/User")
const Ad = require("../models/ad")
const { v4: uuidv4 } = require('uuid')
const jimp = require('jimp')
const State = require("../models/State")

const addImage = async (buffer) => {
    let newName = `${uuidv4()}.jpg`
    let tmp = await jimp.read(buffer)
    tmp.cover(500, 500).quality(80).write(`./public/media/${newName}`)
    return newName
}

module.exports = {
    getCategories: async (req, res) => {
        const cats = await Category.find()
        let categories = []

        for (let i in cats) ({
            ...cats[i],
            img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
        })

        res.json({ categories })

    },
    addAction: async (req, res) => {
        const { title, price, priceNegotiable, desc, cat, token } = req.body
        const user = await User.findOne({ token })

        if (!title || !cat) {
            return res.json({ error: 'Título ou categoria não foram preenchidos.' })
        }

        if (cat.length < 12) {
            return res.json({ error: 'Categoria inexistente.' })
        }

        const category = await Category.findById(cat)
        if (!category) {
            return res.json({ error: 'Categoria inexistente.' })
        }

        if (price) {
            price = price.replace('.', '').replace(',', '.').replace('R$', '')
            price = parseFloat(price)
        } else {
            price = 0
        }

        const newAd = new Ad()
        newAd.status = true
        newAd.userId = user.id
        newAd.state = user.state
        newAd.dateCreated = new Date()
        newAd.title = title
        newAd.category = cat
        newAd.price = price
        newAd.description = desc
        newAd.priceNegotiable = (priceNegotiable == 'true' ? true : false)
        newAd.views = views

        if (req.files || req.files.img) {
            if (req.files.img.length == undefined) {
                if (['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)) {
                    let url = await addImage(req.files.img.data)
                    newAd.images.push({
                        url,
                        default: false
                    })
                }
            } else {
                for (let i = 0; i < req.files.img.length; i++) {
                    if (['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)) {
                        let url = await addImage(req.files.img[i].data)
                        newAd.images.push({
                            url,
                            default: false
                        })
                    }
                }
            }
        }

        if (newAd.images.length > 0) {
            newAd.images[0].default = true
        }

        const info = await newAd.save()
        res.json({ id: info.id })
    },
    getList: async (req, res) => {
        let { sort = 'asc', offset = 0, limit = 8, query, cat, state } = req.query
        let filters = { status: true }
        let total = 0

        if (query) {
            filters.title = { '$regex': query, '$options': '1' }
        }

        if (cat) {
            const c = await Category.findOne({ slug: cat })
            if (c) {
                filters.category = c.id.toString()
            }
        }

        if (state) {
            const s = await State.findOne({ name: state.toUppercase() })
            if (s) {
                filters.state = s.id.toString()
            }
        }

        const adsTotal = await Ad.find(filters)
        total = adsTotal.length

        const adsData = await Ad.find(filters)
            .sort({ dateCreated: (sort == 'desc' ? -1 : +1) })
            .skip(parseInt(offset))
            .limit(parseInt(limit))
        let ads = []

        for (let i in data) {

            let image;
            let defaultImg = await adsData[i].images.find(e => e.default);

            if (defaultImg) {
                image = `${process.env.BASE}/media/${defaultImg.url}`
            } else {
                image = `${process.env.BASE}/media/default.jpg`
            }

            ads.push({
                id: adsData[i].id,
                title: adsData[i].title,
                price: adsData[i].price,
                priceNegotiable: adsData[i].priceNegotiable,
                image
            })
        }
        res.json({ ads, total })
    },
    getItem: async (req, res) => {
        const { id, other = null } = req.query

        if (!id) {
            return res.json({ error: 'Sem produto.' })
        }

        const ad = await Ad.findById(id)
        if (!ad) {
            return res.json({ error: 'Produto inexistente.' })
        }

        ad.views++
        await ad.save()

        let images = []
        for (let i in images) {
            images.push(`${process.env.BASE}/media/${ad.images[i].url}`)
        }

        let category = await Category.findById(ad.category)
        let userinfo = await User.findById(ad.userId)
        let state = await State.findById(ad.state)

        let others = []
        if (other) {
            const otherData = await Ad.find({ status: true, userId: ad.userId })
            for (let i in otherData) {
                let image = `${process.env.BASE}/media/default.jpg`
                let defaultImg = otherData[i].images.find(e => e.default)
                if (defaultImg) {
                    image = `${process.env.BASE}/media/${defaultImg.url}`
                }

                if (otherData.id.toString() != ad.id.toString()) {
                    others.push({
                        id: otherData[i].id,
                        title: otherData[i].title,
                        price: otherData[i].price,
                        priceNegotiable: otherData[i].priceNegotiable,
                        image
                    })
                }
            }
        }
        res.json({
            id: ad.id,
            title: ad.title,
            price: ad.price,
            priceNegotiable: ad.priceNegotiable,
            description: ad.description,
            dateCreated: ad.dateCreated,
            viws: ad.views,
            images,
            category,
            userinfo: {
                name: userinfo.name,
                email: userinfo.email
            },
            state: state.name,
            others
        })
    },
    editAction: async (req, res) => {
        const { id } = req.params
        const { title, status, price, priceNegotiable, desc, cat, images, token } = req.body

        if (id.length < 12) {
            return res.josn({ error: 'ID inválido.' })
        }

        const ad = await Ad.findById(id)
        if (!ad) {
            return res.json({ error: 'Anúncio inexistentes.' })
        }

        const user = await User.findOne({ token })
        if (user.id.toString() != ad.id) {
            return res.json({ error: 'Este anúncio não é seu.' })
        }

        let updates = {}

        if (title) {
            updates.title = title
        }

        if (price) {
            price = price.replace('.', '').replace(',', '.').replace('R$', '')
            price = parseFloat(price)
            updates.price = price
        }

        if (priceNegotiable) {
            updates.priceNegotiable = priceNegotiable
        }

        if (status) {
            updates.description = desc
        }

        if (cat) {
            const category = await Category.findOne({ slug: cat })
            if (!category) {
                return res.json({ error: 'Categoria inxistente.' })
            }

            updates.category = category.id.toString()
        }

        if (images) {
            updates.images = images
        }

        await Ad.findByIdAndUpdate(id, { $set: updates })
        if (req.files && req.files.img) {
            const adI = await Ad.findById(id);

            if (req.files.img.length == undefined) {
                if (['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)) {
                    let url = await addImage(req.files.img.data);
                    adI.images.push({
                        url,
                        default: false
                    });
                }
            } else {
                for (let i = 0; i < req.files.img.length; i++) {
                    if (['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)) {
                        let url = await addImage(req.files.img[i].data);
                        adI.images.push({
                            url,
                            default: false
                        });
                    }
                }
            }

            adI.images = [...adI.images];
            await adI.save();
        }

        res.json({ error: '' })
    }
}