var util  = {};

util.getSession = (body) =>{
    var session = {};
    session.sessionId = body.session.id;
    session.callId = body.session.callId;
    session.UserType = body.session.UserType;
    session.applicationId = body.session.applicationId;
    session.timestamp = body.session.timestamp;
    session.to = body.session.to;
    session.from = body.session.from;
    session.headers = body.session.headers;
    return session;
};

util.getResult = (body)=>{
    var Result = {};
    console.log('result body: ', body);
    return Result;
    
}

module.exports = util;