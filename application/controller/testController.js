const test = require('./../models/testModel')           

exports.getAlltests = async (req,res) =>{   
    try {
        const test = await test.find({});
        res.status(200).json({
            status:'success',
            requested: req.requestTime,
            results: tests.length,
            data : {
                tests
            }
    });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            messsage: err
        });
    }
};

exports.gettestById = async (req, res) => {
    try {
        const test = await test.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            requested: req.requestTime,
            data: {
                test
            }
    });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            messsage: err,
        });
    }  
};

exports.createtest = async (req, res) => {
    try {
        const newtest = await test.create(req.body)
        res.status(200).json({
            status: 'success',
            requested: req.requestTime,
            data: {
                newtest
            }
    });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }     
}

exports.updatetestById = async (req, res)=>{
    try {
        const test = await test.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            requested: req.requestTime,
            data: {
                test,
            },
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            messsage: err,
        });
    }
}

exports.deletetestById = async (req, res)=>{
    try {
        await test.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            requested: req.requestTime,
        });
    } catch (err) {
        res.status(404).json({    
            status: 'failed',
            messsage: err,
        });
    }
}
