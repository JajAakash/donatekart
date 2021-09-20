const { Router } = require('express')
const authRouter = Router()
const controller = require('./controller')

/**
 * @route /api/v2/me/report/jobs/overview/:companyId
 * @method GET
 * @description Endpoint for overview of the job section
 * @access private
 */
authRouter.get('/details', controller.campaignList)

authRouter.get('/active', controller.activeCampaigns)

authRouter.get('/close', controller.closeCampaigns)

module.exports = authRouter