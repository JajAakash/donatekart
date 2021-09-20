const { Router } = require('express')
const authRouter = Router()
const controller = require('./controller')

/**
 * @method GET
 * @description Endpoint for data of the campaigns
 */
authRouter.get('/details', controller.campaignList)

authRouter.get('/active', controller.activeCampaigns)

authRouter.get('/close', controller.closeCampaigns)

module.exports = authRouter
