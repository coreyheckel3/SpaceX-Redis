import express from 'express';
const app = express();
import configRoutesFunction from './routes/index.js';
import {flatten} from 'flat';
import redis from 'redis'
const client = redis.createClient();
client.connect().then(() => {});

const makeTestPromise = () => {
    return new Promise((fulfill, reject) => {
      setTimeout(() => {
        fulfill({status: 'Good'});
      }, 5000);
    });
  };

configRoutesFunction(app);

const rocketCache = async(req, res, next) =>{
    try {
      const rocketsCache = await getAsync('Rockets');
  
      if (rocketsCache) 
      {
        const cachedRockets = JSON.parse(rocketsCache);
        return res.status(200).json(cachedRockets);
      } else {
        next();
      }
    } catch (e) {
      return res.status(500).json({ error: e });
    }
}

const launchCache = async(req, res, next) =>{
    try {
      const launchesCache = await getAsync('Launches');
  
      if (launchesCache) 
      {
        const cachedlaunches = JSON.parse(launchesCache);
        return res.status(200).json(cachedlaunches);
      } else {
        next();
      }
    } catch (e) {
      return res.status(500).json({ error: e });
    }
}

const capsuleCache = async(req, res, next) =>{
    try {
      const capsulesCache = await getAsync('Capsules');
  
      if (capsuleCache) 
      {
        const cachedCapsules = JSON.parse(capsuleCache);
        return res.status(200).json(cachedCapsules);
      } else {
        next();
      }
    } catch (e) {
      return res.status(500).json({ error: e });
    }
}

const rocketIdCache = async(req,res,next) =>{
    try{
        rocketId = req.params.id
        const rocketCache = await getAsync(rocketId)
        if(rocketCache)
        {
            const cachedRocket = JSON.parse(rocketCache)
            return res.status(200).jason(cachedRocket)
        }else{
            next()
        }
    }catch(e){
        return res.status(500).json({error: e})
    }
}

const launchIdCache = async(req,res,next) =>{
    try{
        launchId = req.params.id
        const launchCache = await getAsync(launchId)
        if(launchCache)
        {
            const cachedLaunch = JSON.parse(launchCache)
            return res.status(200).jason(cachedLaunch)
        }else{
            next()
        }
    }catch(e){
        return res.status(500).json({error: e})
    }
}

const capsuelIdCache = async(req,res,next) =>{
    try{
        capsuleId = req.params.id
        const capsuleCache = await getAsync(capsuleId)
        if(capsuleCache)
        {
            const cachedCapsule = JSON.parse(capsuleCache)
            return res.status(200).jason(cachedCapsule)
        }else{
            next()
        }
    }catch(e){
        return res.status(500).json({error: e})
    }
}
  


app.use('/api/rockets/', rocketCache);
app.use('/api/launches/', launchCache);
app.use('/api/capsules/', capsuleCache);
app.use('/api/rockets/:id', rocketIdCache)
app.use('/api/launches/:id', launchIdCache)
app.use('/api/capsules/:id', capsuelIdCache)





app.listen(3000, async() => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});