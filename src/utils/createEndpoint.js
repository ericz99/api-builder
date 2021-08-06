/* eslint-disable import/no-anonymous-default-export */

const generateGetEndpoint = (data) => {
  return `
    try {
        // Read All Endpoint
        app.get('/api/v1/${data.modelName}/all', async (req, res, next) => {

        const ${data.modelName} = await ${data.capVersion}.find({});
                    
        return res.status(200).json({
            status: 200,
            data: {
                ${data.modelName}: ${data.modelName}
            }
        });
    } catch (e) {
        if (e) {
            return next(e);
        }
    }
    `;
};

const generatePostEndpoint = (data) => {
  return `
    try {
        // Create Endpoint
        app.post('/api/v1/${data.modelName}/new', async (req, res, next) => {

        if(!req.body.${data.modelName}){
                res.status(400).json({
                    resolved: "failure",
                    message: 'req.body.${data.modelName} can not be empty',
                });
            return;
        }
                    
        const ${data.modelName} = await ${data.capVersion}.create({
            ${data.modelMapper.join("\n\t\t\t")}    
        });

        return res.status(200).json({
            status: 200,
            data: {
                ${data.modelName}: ${data.modelName} 
            }
        });
    } catch (e) {
        if (e) {
            return next(e);
        }
    }
    `;
};

const generatePutEndpoint = (data) => {
  return `
    try {
        // Update Endpoint
        app.put('/api/v1/${
          data.modelName
        }/update/:id', async (req, res, next) => {

        if (!req.params.id) {
                res.status(400).json({
                    resolved: "failure",
                    message: 'req.params.id can not be empty',
                });
            return;
        }
                    
        const ${data.modelName} = await ${data.capVersion}.updateMany({
            ${data.modelMapper.join("\n\t\t\t")}    
        }, {
            "$set": { 
                ${data.modelMapper.join("\n\t\t\t\t")} 
            }
        });

        return res.status(200).json({
            status: 200,
            data: {
                ${data.modelName}: ${data.modelName}
            }
        });
    } catch (e) {
        if (e) {
            return next(e);
        }
    }
    `;
};

const generateDeleteEndpoint = (data) => {
  return `
    try {
        // Delete Endpoint
        app.post('/api/v1/${data.modelName}/delete/:id', async (req, res, next) => {

        if (!req.params.id) {
                res.status(400).json({
                    resolved: "failure",
                    message: 'req.params.id can not be empty',
                });
            return;
        }
                    
        await ${data.capVersion}.deleteOne({ _id: req.params.id });

        return res.status(200).json({
            status: 200,
            data: {
                message: "Successfully deleted item!"
            }
        });
    } catch (e) {
        if (e) {
            return next(e);
        }
    }
    `;
};

export {
  generateGetEndpoint,
  generatePostEndpoint,
  generatePutEndpoint,
  generateDeleteEndpoint,
};
