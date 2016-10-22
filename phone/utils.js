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
    var result = {};
    result.sessionId = body.result.sessionId;
    result.callId = body.result.callId;
    result.state = body.result.state;
    result.sessionDuration = body.result.sessionDuration;
    result.sequence = body.result.sequence;
    result.complete = body.result.complete;
    result.error = body.result.error;
    result.userType = body.result.userType;
    result.actions = body.result.actions;
    return result;
    
};

module.exports = util;