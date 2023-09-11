
global.getTimestamp = () => {
    let d = new Date();
    d.setTime(d.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    return d.getTime();
};

global.createSuccessResponse = (res, data, code = 200, isPaginated = false) => {
    if (isPaginated || (data && data.docs)) {
        data.data = data.docs;
        delete data.docs;
        res.response = {data};
        return res.status(code).json(data);
    }

    res.success = {data};
    return res.status(code).json({data});
};

global.createErrorResponse = (res, error = "Oops. An Error Occurred", code = 500) => {
    res.error = {error};
    return res.status(code).json({error});
};