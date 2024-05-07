import {Router} from 'express';
const router = Router();
import * as data from '../data/data.js'
import helper from '../helpers.js'
import redis from 'redis'
import {flatten} from 'flat'
const client = redis.createClient()
client.connect().then(() => {})


router.route('/').get(async (req, res, next) => { 
});
router
  .route('/api/rockets/')
  .get(async(req,res) => {
    try
    {

        const rockets = await data.getRockets();
        //let flatRockets = flatten(rockets)
        //console.log(flatRockets)
        let jsonRocket = JSON.stringify(rockets)
        let jsonData = await client.set('Rockets', jsonRocket)
        console.log(jsonRocket)
        return res.status(200).json(rockets);
    } 
    catch (e) 
    {
        return res.status(500).send(e);
    }
  })

  router
  .route('/api/rockets/history')
  .get(async (req, res) => {
    try {
        let lastRocketIds = await client.lRange('rocketHistory', 0, 19);
        let lastRockets = await Promise.all(lastRocketIds.map((id) => client.get(id)));
        lastRockets = lastRockets.map((rocket) => JSON.parse(rocket));
        return res.status(200).json(lastRockets);
      } catch (e) {
        return res.status(500).json({ error: e });
      }
    
  });
  
  router
    .route('/api/rockets/:id')
    .get(async (req, res) => {
        try {

            await helper.checkId(req.params.id);
            const rocket = await data.getRocketById(req.params.id);
            let jsonRocket = JSON.stringify(rocket)
            await client.set(req.params.id, jsonRocket);
            await client.lPush('rocketHistory', req.params.id);
        
            return res.status(200).json(rocket);
        } catch (e) {
            return res.status(404).json({error:e});
        }
});

  router
  .route('/api/launches/')
  .get(async (req, res) => {
    try
    {
        const launches = await data.getLaunches();
        let jsonLaunch = JSON.stringify(launches)
        let jsonData = await client.set('Launches', jsonLaunch)
        return res.status(200).json(launches);
    } 
    catch (e) 
    {
        return res.status(500).send(e);
    }
  
  });

router
  .route('/api/launches/:id')
  .get(async (req, res) => {
    try {

        await helper.checkId(req.params.id);
        const launch = await data.getLaunchById(req.params.id);
        let jsonLaunch = JSON.stringify(launch)
        let jsonData = await client.set(req.params.id, jsonLaunch)
        return res.status(200).json(launch);
    } catch (e) {
        return res.status(404).json({error:e});
    }
  });

router
  .route('/api/capsules/')
  .get(async (req, res) => {
    try
    {
        const capsules = await data.getCapsules();
        let jsonCapsule = JSON.stringify(capsules)
        let jsonData = await client.set('Capsules', jsonCapsule)
        return res.status(200).json(capsules);
    } 
    catch (e) 
    {
        return res.status(500).send(e);
    }
  });
  router
  .route('/api/capsules/:id')
  .get(async (req, res) => {
    try {

        await helper.checkId(req.params.id);
        const capsule = await data.getCapsuleById(req.params.id);
        let jsonCapsule = JSON.stringify(capsule)
        let jsonData = await client.set(req.params.id, jsonCapsule)
        return res.status(200).json(capsule);
    } catch (e) {
        return res.status(404).json({error:e});
    }
  });
export default router;