const fetch = require('node-fetch')
const moment = require('moment')

exports.campaignList = [
    async (req, res, next) => {
        try {
            let modifiedCampaigns=[]
            const url = 'https://testapi.donatekart.com/api/campaign'
            const data=await fetch(url)
            const  campaignList = await data.json()
            const sortedData = campaignList.sort((first,second)=> first.totalAmount- second.totalAmount).reverse()
            sortedData.forEach(({title,totalAmount,backersCount,endDate})=>{
                modifiedCampaigns.push({Title:title,TotalAmount: totalAmount, BackersCount:backersCount,EndDate:endDate})
            })
            return res.status(200).json(modifiedCampaigns)
            
        } catch (error) {
            next(error)
        }
        
        
    },
]

exports.activeCampaigns = [
    async (req, res, next) => {
        try {
            let modifiedCampaigns=[]
            const url = 'https://testapi.donatekart.com/api/campaign'
            const data=await fetch(url)
            const  activeCampaigns = await data.json()
            for(const {created,title,totalAmount,backersCount,endDate} of activeCampaigns){
                if(moment(endDate).isSameOrAfter(moment())){
                    const createdDateDifference = moment().diff(moment(created), 'days')
                    if(createdDateDifference<=30){
                        modifiedCampaigns.push({Title:title,TotalAmount: totalAmount, BackersCount:backersCount,CreatedDate:created,EndDate:endDate})
                    }
                }
            }
            return res.status(200).json(modifiedCampaigns)
        } catch (error) {
            next(error)
        }
        
        
    },
]

exports.closeCampaigns = [
    async (req, res, next) => {
        try {
            let modifiedCampaigns=[]
            const url = 'https://testapi.donatekart.com/api/campaign'
            const data=await fetch(url)
            const  activeCampaigns = await data.json()
            for(const {created,title,procuredAmount,totalAmount,backersCount,endDate} of activeCampaigns){
                if(moment(endDate).isBefore(moment()) || (procuredAmount>=totalAmount)){
                    modifiedCampaigns.push({Title:title,ProcuredAmount:procuredAmount,TotalAmount: totalAmount, BackersCount:backersCount,CreatedDate:created,EndDate:endDate})

                }
            }
            return res.status(200).json(modifiedCampaigns)
        } catch (error) {
            next(error)
        }
    },
]